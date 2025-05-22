export const uploadDocuments = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    // Extract uploaded files with field names
    const uploadedFiles = Object.entries(req.files).map(
      ([fieldName, fileArray]) => ({
        fieldName, // Input field name (e.g., "companyPan", "aadhar")
        filename: fileArray[0].filename,
        path: `http://localhost:8014/public/${fileArray[0].filename}`, // Public URL
      })
    );

    return res.status(200).json({
      success: true,
      message: "Files uploaded successfully",
      files: uploadedFiles,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res
      .status(500)
      .json({ success: false, message: "File upload failed" });
  }
};
