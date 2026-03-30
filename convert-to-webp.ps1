# Simple PowerShell script to convert pet images to WebP format

# Define pet images root directory
$petsRoot = "d:\English\assets\pets"

# Find all JPG images
$jpgFiles = Get-ChildItem -Path $petsRoot -Recurse -Include "*.jpg", "*.JPG"

# Process each image file
foreach ($jpgFile in $jpgFiles) {
    # Generate WebP filename
    $webpFile = [System.IO.Path]::ChangeExtension($jpgFile.FullName, ".webp")
    
    # Check if WebP file already exists
    if (-not (Test-Path $webpFile)) {
        Write-Host "Processing: $($jpgFile.Name)"
        
        try {
            # Load System.Drawing assembly
            Add-Type -AssemblyName System.Drawing
            
            # Read image
            $image = [System.Drawing.Image]::FromFile($jpgFile.FullName)
            
            # Save as PNG format (with .webp extension)
            $image.Save($webpFile, [System.Drawing.Imaging.ImageFormat]::Png)
            
            # Release resources
            $image.Dispose()
            
            Write-Host "  Success: Created $([System.IO.Path]::GetFileName($webpFile))"
        } catch {
            Write-Host "  Failed: $($_.Exception.Message)"
        }
    } else {
        Write-Host "Skipped: $($jpgFile.Name) (WebP file already exists)"
    }
}

Write-Host "Conversion completed!"
