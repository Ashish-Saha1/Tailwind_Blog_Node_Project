

const deleteUploadedFile = async(req,res,next)=>{
        if(req.file){
            const filePath = path.join(__dirname, "../Public/uploads", req.file.filename)
            try {
                await fs.promises.unlink(filePath)
                console.log('deleted')
            } catch (error) {
                console.log(`Failed to delete Uploaded file, ${error}`);
                                
            }
        }
    }



    module.exports = deleteUploadedFile;