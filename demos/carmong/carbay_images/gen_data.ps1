# Generate car data JS from carbay API (ASCII-only script to avoid PS5.1 encoding issues)
$ErrorActionPreference = "Stop"
# Script lives in <root>\carbay_images\ ; derive root from its parent
$imgRoot = $PSScriptRoot                      # ...\carbay_images
$root = Split-Path $imgRoot -Parent           # ...\리소스
$carsDir = Join-Path $imgRoot "cars"

function Get-Utf8Json($url) {
    $resp = Invoke-WebRequest $url -UseBasicParsing
    $bytes = $resp.RawContentStream.ToArray()
    $text = [System.Text.Encoding]::UTF8.GetString($bytes)
    return ($text | ConvertFrom-Json)
}

$models = Get-Utf8Json "https://carbay.kr/api/models"
$brands = Get-Utf8Json "https://carbay.kr/api/brands"

$brandMap = @{}
foreach ($b in $brands) { $brandMap[[string]$b.brandCode] = @{ name = $b.name; country = $b.country } }

$imgMap = @{}
Get-ChildItem $carsDir -Recurse -File | ForEach-Object {
    if ($_.Name -match '^(\d+)_') {
        $rel = $_.FullName.Replace("$root\", "").Replace("\", "/")
        $imgMap[$matches[1]] = $rel
    }
}

$out = New-Object System.Collections.ArrayList
$rank = 0
foreach ($m in $models) {
    $id = [string]$m.id
    if (-not $imgMap.ContainsKey($id)) { continue }
    $bc = [string]$m.brandCode
    $bInfo = $brandMap[$bc]
    if (-not $bInfo) { continue }
    $rank++

    $minRent  = if ($m.minRent)  { [int]$m.minRent }  else { 0 }
    $minLease = if ($m.minLease) { [int]$m.minLease } else { 0 }

    # 신차 출시가 추정 (실측 렌트/리스 월납입 기반, 현실적 계수로 보정)
    if ($minRent -gt 0) {
        $newPrice = [math]::Round($minRent * 140 / 100000) * 100000
    } elseif ($minLease -gt 0) {
        $newPrice = [math]::Round($minLease * 90 / 100000) * 100000
    } else {
        $newPrice = 0
    }
    # 합리적 범위로 클램프 (1,300만 ~ 1.8억)
    if ($newPrice -gt 0 -and $newPrice -lt 13000000)  { $newPrice = 13000000 }
    if ($newPrice -gt 180000000)                       { $newPrice = 180000000 }

    # country: 'd' = domestic, else import
    $country = if ($bInfo.country -eq 'd') { 'domestic' } else { 'import' }

    $obj = [ordered]@{
        id       = $id
        name     = $m.name
        brand    = $bInfo.name
        country  = $country
        image    = $imgMap[$id]
        rent     = $minRent
        lease    = $minLease
        newPrice = [int]$newPrice
        rank     = $rank
    }
    [void]$out.Add($obj)
}

# --- Brand list with logo paths ---
$logosDir = Join-Path $imgRoot "logos"
$logoMap = @{}
Get-ChildItem $logosDir -File | ForEach-Object {
    if ($_.Name -match '^(\d+)_') {
        $rel = $_.FullName.Replace("$root\", "").Replace("\", "/")
        $logoMap[$matches[1]] = $rel
    }
}
# count cars per brand name
$carCount = @{}
foreach ($c in $out) {
    if (-not $carCount.ContainsKey($c.brand)) { $carCount[$c.brand] = 0 }
    $carCount[$c.brand]++
}
$brandsOut = New-Object System.Collections.ArrayList
foreach ($b in $brands) {
    $code = [string]$b.brandCode
    $logo = if ($logoMap.ContainsKey($code)) { $logoMap[$code] } else { "" }
    $country = if ($b.country -eq 'd') { 'domestic' } else { 'import' }
    $cnt = if ($carCount.ContainsKey($b.name)) { $carCount[$b.name] } else { 0 }
    if ($cnt -eq 0) { continue }
    $bo = [ordered]@{
        code    = $code
        name    = $b.name
        country = $country
        logo    = $logo
        count   = $cnt
    }
    [void]$brandsOut.Add($bo)
}

$json = $out | ConvertTo-Json -Depth 5 -Compress
$brandJson = $brandsOut | ConvertTo-Json -Depth 5 -Compress
$content = "window.ALL_CARS = " + $json + ";`r`nwindow.ALL_BRANDS = " + $brandJson + ";"

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$outPath = Join-Path $imgRoot "all_cars_data.js"
[System.IO.File]::WriteAllText($outPath, $content, $utf8NoBom)

Write-Host ("Done: " + $out.Count + " cars -> all_cars_data.js")
$out | Group-Object brand | Sort-Object Count -Descending | Select-Object Count, Name | Format-Table -AutoSize
