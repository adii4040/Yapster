//Model
import User from '../Models/User.model.js'
import Message from '../Models/Message.model.js'
//Utils
import { asyncHandler, ApiError, ApiResponse, uploadOnCloudinary } from '../utils/index.js'




const sendMessage = asyncHandler(async (req, res) => {
    const { receiverId } = req.params
    if (!receiverId) throw new ApiError(401, 'No receiver id is provided.')

    const senderId = req.user._id

    const { text } = req.body

    let localsharedImgPath = null;
    let localsharedVideosPath = null;
    let localsharedFilesPath = null;

    if (req.files) {
        console.log(req.files.fieldname, req.files)
        if (req.files.sharedImg) {
            localsharedImgPath = req.files.sharedImg[0].path
        }
        if (req.files.sharedVideos) {
            localsharedVideosPath = req.files.sharedVideos[0].path
        }
        if (req.files.sharedFiles) {
            localsharedFilesPath = req.files.sharedFiles[0].path
        }
    }
    console.log(`image-localpath ${localsharedImgPath}, video-url ${localsharedVideosPath}, file-url ${localsharedFilesPath}`)
    let sharedImg;
    let sharedVideos;
    let sharedFiles;

    if (localsharedImgPath) {
        sharedImg = await uploadOnCloudinary(localsharedImgPath)
    }
    if (localsharedVideosPath) {
        sharedVideos = await uploadOnCloudinary(localsharedVideosPath)
    }
    if (localsharedFilesPath) {
        sharedFiles = await uploadOnCloudinary(localsharedFilesPath)
    }

    console.log(`image-url ${sharedImg?.url}, video-url ${sharedVideos?.url}, file-url ${sharedFiles?.url}`)

    const message = await Message.create({
        senderId,
        receiverId,
        text,
        attachments: {
            image: sharedImg?.url,
            video: sharedVideos?.url,
            file: sharedFiles?.url
        }
    })

    return res.status(201).json(
        new ApiResponse(
            201,
            { message },
            'message sent successfully'
        )
    )
})

const getMessage = asyncHandler(async (req, res) => {
    const { receiverId } = req.params
    const myId = req.user._id
    const messages = await Message.find({
        $or: [
            { senderId: myId, receiverId },
            { senderId: receiverId, receiverId: myId }
        ]
    })
    if (!messages.length) {
        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    messages: "You have no conversation with this user."
                }
            )
        )
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            { messages },
            "All the messages are fetched successfully."
        )
    )
})

export {
    sendMessage,
    getMessage
}
