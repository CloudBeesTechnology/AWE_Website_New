import { getCurrentUser } from "@aws-amplify/auth";
import { uploadData, remove } from "@aws-amplify/storage";
import axios from "axios";

// Function to upload file to S3
// export const uploadDocString = async (file, fileType, tempID) => {
//   try {
//     if (!file) return null; // Skip if no file is provided

//     // Encode file name for URL safety
//     const encodedFileName = encodeURIComponent(file.name).replace(/%20/g, ' ');

//     // Construct the upload URL for API Gateway
//     const uploadUrl = `https://gnth2qx5cf.execute-api.ap-southeast-1.amazonaws.com/fileupload/aweadininprod2024954b8-prod/public%2F${fileType}%2F${tempID}%2F${encodedFileName}`;

//     // Upload the file using axios
//     await axios.put(uploadUrl, file)
//       .then((res) => {
//         console.log(res.data.message);
//       })
//       .catch((err) => {
//         console.error("Error uploading file:", err);
//       });

//     // Generate the uploaded file URL
//     return `https://aweadininprod2024954b8-prod.s3.ap-southeast-1.amazonaws.com/public/${fileType}/${tempID}/${encodedFileName}`;
//   } catch (error) {
//     console.error(`Error uploading ${fileType}:`, error);
//     throw error;
//   }
// };

export const uploadDocString = async (file, fileType, tempID) => {
  try {
    if (!file) {
      return null; 
    }

    // Encode file name for URL safety using encodeURIComponent (handles all special characters)
    const encodedFileName = encodeURIComponent(file.name);

    // Construct the upload URL for API Gateway
    const uploadUrl = `https://gnth2qx5cf.execute-api.ap-southeast-1.amazonaws.com/fileupload/aweadininprod2024954b8-prod/public%2F${fileType}%2F${tempID}%2F${encodedFileName}`;

    // Upload the file using axios
    await axios.put(uploadUrl, file)
      .then((res) => {
        console.log("Response from API after uploading:", res.data.message);
      })
      .catch((err) => {
        console.error("Error uploading file:", err);
      });

    // Decode the file name using decodeURIComponent (reverts encoding)
    const decodedFileName = decodeURIComponent(encodedFileName);

    // Generate the uploaded file URL with the decoded file name
    const uploadedFileUrl = `https://aweadininprod2024954b8-prod.s3.ap-southeast-1.amazonaws.com/public/${fileType}/${tempID}/${decodedFileName}`;

    return uploadedFileUrl;
  } catch (error) {
    console.error("Error during file upload process:", error);
    throw error;
  }
};
// export const uploadDocString = async (
//   file,
//   fileType,
//   setUploadedDocs,
//   tempID,
//   index
// ) => {
//   try {
//     // Encode file name for URL safety
//     const encodedFileName = encodeURIComponent(file.name);

//     // Construct the upload URL for API Gateway
//     const uploadUrl = `https://gnth2qx5cf.execute-api.ap-southeast-1.amazonaws.com/fileupload/aweadininprod2024954b8-prod/public%2F${fileType}%2F${tempID}%2F${encodedFileName}`;

//     // Upload the file using axios
//     await axios.put(uploadUrl, file)
//       .then((res) => {
//         console.log(res.data.message);
//       })
//       .catch((err) => {
//         console.error("Error uploading file:", err);
//       });

//     // Generate the uploaded file URL
//     const fileUrl = `https://aweadininprod2024954b8-prod.s3.ap-southeast-1.amazonaws.com/public/${fileType}/${tempID}/${encodedFileName}`;
//     const uploadDate = new Date().toISOString().split("T")[0];

//     // If index is provided, store the uploaded file in an array
//     if (typeof index === "number") {
//       setUploadedDocs((prev) => {
//         const updatedUploads = { ...prev };

//         // Initialize the array if it doesn't exist
//         updatedUploads[fileType] = updatedUploads[fileType] || [];
//         updatedUploads[fileType][index] =
//           updatedUploads[fileType][index] || [];

//         // Check if the file already exists in the array
//         const existingUpload = updatedUploads[fileType][index].find(
//           (item) => item.upload === fileUrl
//         );

//         if (!existingUpload) {
//           updatedUploads[fileType][index].push({
//             upload: fileUrl,
//             date: uploadDate,
//           });
//         }

//         console.log(updatedUploads);
//         return updatedUploads;
        
//       });
//     } else {
//       setUploadedDocs((prevState) => ({
//         ...prevState,
//         [fileType]: fileUrl,
//       }));
//     }
//   } catch (error) {
//     console.error(`Error uploading ${fileType}:`, error);
//   }
// };

export const uploadDocs = async (
  file,
  fileType,
  setUploadedDocs,
  tempID,
  index
) => {
  try {

      const result = await uploadData({
        
        path: `public/${fileType}/${tempID}/${file.name}`,
        data: file,
      }).result;
      
      const fileUrl = result.path;
 
      const uploadDate = new Date().toISOString().split("T")[0];

      if (typeof index === "number") {
        setUploadedDocs((prev) => {
          const updatedUploads = { ...prev };
          // Initialize the array if it doesn't exist
          updatedUploads[fileType] = updatedUploads[fileType] || [];
          updatedUploads[fileType][index] =
            updatedUploads[fileType][index] || [];

          const existingUpload = updatedUploads[fileType][index].find(
            (item) => item.upload === fileUrl
          );

          if (!existingUpload) {
            updatedUploads[fileType][index].push({
              upload: fileUrl,
              date: uploadDate,
            });
          }
          return updatedUploads;
        });
      } 
        setUploadedDocs((prev) => ({
          ...prev,
          [fileType]: [
            ...(prev[fileType] || []),
            { upload: fileUrl, date: uploadDate },
          ],
        }));
    
  } catch (error) {
    console.log(`Error uploading ${fileType}:, error`);
  }
};
// Delete file from S3 and update state
export const deleteDocs = async (fileUrl, fileType, setUploadedDocs, tempID, index) => {
  try {
    // Delete from S3
    await remove(fileUrl);

    // Update the state to remove the deleted file reference
    setUploadedDocs((prev) => {
      const updatedUploads = { ...prev };

      if (typeof index === "number" && Array.isArray(updatedUploads[fileType])) {
        updatedUploads[fileType][index] = updatedUploads[fileType][index].filter(
          (item) => item.upload !== fileUrl
        );

        // Remove the index array if it becomes empty
        if (updatedUploads[fileType][index].length === 0) {
          delete updatedUploads[fileType][index];
        }
      } else if (updatedUploads[fileType] === fileUrl) {
        // Handle single file types like profilePhoto
        updatedUploads[fileType] = null;
      } else if (Array.isArray(updatedUploads[fileType])) {
        // For general arrays of files
        updatedUploads[fileType] = updatedUploads[fileType].filter(
          (item) => item.upload !== fileUrl
        );
      }

      return updatedUploads;
    });

    console.log(`File with URL ${fileUrl} deleted from S3 and state.`);
  } catch (error) {
    console.error(`Error deleting ${fileType}:`, error);
  }
};

