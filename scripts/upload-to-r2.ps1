param(
    [Parameter(Mandatory = $true)]
    [string]$FilePath,

    [ValidateSet("blog", "mascot", "assets", "covers", "pages", "draft")]
    [string]$Type = "blog",

    [string]$Slug = "",

    [string]$SubPath = "",

    [string]$Bucket = "threetwoa-blog-assets",

    [string]$PublicUrl = "https://pub-7e1dd61bb508406fb8397a36b63ecb3b.r2.dev"
)

$rclone = "C:\Users\Lenovo\AppData\Local\Microsoft\WinGet\Packages\Rclone.Rclone_Microsoft.Winget.Source_8wekyb3d8bbwe\rclone-v1.74.3-windows-amd64\rclone.exe"

function Normalize-Slug {
    param([string]$Text)

    $clean = $Text.ToLower()
    $clean = $clean -replace "[\s_]+", "-"
    $clean = $clean -replace "[^\p{L}0-9\-]", ""
    $clean = $clean -replace "-{2,}", "-"
    $clean = $clean.Trim("-")

    if ([string]::IsNullOrWhiteSpace($clean)) {
        $clean = "misc"
    }

    return $clean
}

function Normalize-FileName {
    param([string]$Name)

    $base = [System.IO.Path]::GetFileNameWithoutExtension($Name)
    $ext = [System.IO.Path]::GetExtension($Name).ToLower()

    $clean = $base.ToLower()
    $clean = $clean -replace "[\s_]+", "-"
    $clean = $clean -replace "[^\p{L}0-9\-.]", ""
    $clean = $clean -replace "-{2,}", "-"
    $clean = $clean.Trim("-")

    if ([string]::IsNullOrWhiteSpace($clean)) {
        $clean = "untitled"
    }

    return "$clean$ext"
}

$now = Get-Date
$datePath = $now.ToString('yyyy/MM', [System.Globalization.CultureInfo]::InvariantCulture)
$slug = Normalize-Slug -Text $Slug

switch ($Type) {
    "blog"   { $basePath = "blog/$datePath/$slug" }
    "covers" { $basePath = "covers/$datePath/$slug" }
    "mascot" { $basePath = "mascot" }
    "assets" { $basePath = "assets" }
    "pages"  { $basePath = "pages/$SubPath".Trim("/") }
    "draft"  { $basePath = "draft" }
}

if ($Type -ne "pages" -and -not [string]::IsNullOrWhiteSpace($SubPath)) {
    $basePath = "$basePath/$SubPath".Trim("/")
}

if (-not (Test-Path $FilePath)) {
    Write-Error "文件不存在: $FilePath"
    exit 1
}

$originalName = [System.IO.Path]::GetFileName($FilePath)
$fileName = Normalize-FileName -Name $originalName
$objectKey = "$basePath/$fileName"

Write-Host "正在上传: $originalName -> r2:$Bucket/$objectKey"

& $rclone copyto $FilePath "r2:$Bucket/$objectKey" --progress

if ($LASTEXITCODE -eq 0) {
    $url = "$PublicUrl/$objectKey"
    Write-Host "上传成功" -ForegroundColor Green
    Write-Host "Public URL: $url"
    Write-Host ""
    Write-Host "Markdown:"
    Write-Host "![$fileName]($url)"
} else {
    Write-Error "上传失败"
    exit 1
}
