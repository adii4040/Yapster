import React, { useRef, useState } from 'react'
import { Paperclip, Image, Folder, Play, Send } from 'lucide-react';
import { useChatStore } from '../Store/useChatStore';
import { resetReqStatus } from '../utils/ResetReqStatus';


function MessageInput() {
  const imageInputRef = useRef(null)
  const videoInputRef = useRef(null)
  const fileInputRef = useRef(null)

  const { sendMessage, selectedUser, sendMessageReqData, isMessageSending, sendMessageResStatus: { isSuccess, isError, error }, } = useChatStore()
  const [form, setForm] = useState({
    text: "",
    sharedImg: "",
    sharedVideos: "",
    sharedFiles: ""
  })

  const isFormEmpty =
  !form.text.trim() &&
  (!form.sharedFiles || form.sharedFiles.length === 0) &&
  (!form.sharedImg || form.sharedImg.length === 0) &&
  (!form.sharedVideos || form.sharedVideos.length === 0);

  const handleChange = (e) => {
    const { value, files, name } = e.target

    if (name === "sharedImg") {
      setForm({ ...form, sharedImg: files[0] })
    }
    if (name === "sharedVideos") {
      setForm({ ...form, sharedVideos: files[0] })
    }
    if (name === "sharedFiles") {
      setForm({ ...form, sharedFiles: files[0] })
    }
    if (name === "text") {
      setForm({ ...form, text: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formDataObj = new FormData()
    formDataObj.append("text", form.text)
    formDataObj.append("sharedImg", form.sharedImg)
    formDataObj.append("sharedVideos", form.sharedVideos)
    formDataObj.append("sharedFiles", form.file)
    resetReqStatus("sendMessage")
    sendMessage({ receiverId: selectedUser?._id, formData: formDataObj })
    console.log(form)
    setForm({
      text: "",
      sharedImg: "",
      sharedVideos: "",
      sharedFiles: ""
    })
  }
  return (
    <div className='w-full ' >
      <div>

      </div>
      <form className='flex items-center gap-2' onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.text}
          name='text'
          placeholder='Text a message...'
          onChange={handleChange}
          className='w-full input input-bordered rounded-lg input-md'
        />
        <div className="dropdown dropdown-top dropdown-left">
          <div tabIndex={0} role="button" className=""><Paperclip size={20} /></div>
          <p className='absolute text-sm text-base-300 bg-base-content px-0.5 -top-8 -right-16 hidden lg:group-hover:block'>Attachments</p>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow gap-2">
            <div className='imageFile '>
              <input
                type="file"
                accept='image/*'
                name='sharedImg'
                onChange={handleChange}
                className='hidden'
                ref={imageInputRef}
              />

              <button type='button'
                className='flex items-center gap-1'
                onClick={() => imageInputRef.current?.click()}>
                <Image />
                <span className='text-sm'>Share any image.</span>
              </button>
            </div>

            <div className='videoFile'>
              <input
                type="file"
                accept='video/*'
                name='sharedVideos'
                onChange={handleChange}
                className='hidden'
                ref={videoInputRef} />

              <button
                type='button'
                className='flex items-center gap-1'
                onClick={() => videoInputRef.current?.click()}
              >
                <Play />
                <span>Share any video.</span>
              </button>
            </div>

            <div className='docFile'>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
                name='sharedFiles'
                onChange={handleChange}
                className='hidden'
                ref={fileInputRef} />

              <button
                type='button'
                className='flex items-center gap-1'
                onClick={() => fileInputRef.current?.click()}
              >
                <Folder />
                <span>Share any documents.</span>
              </button>
            </div>
          </ul>
        </div>

        <button type='submit' className='btn btn-sm btn-circle' disabled={isFormEmpty}>
          <Send size={22} />
        </button>
      </form>
    </div>
  )
}

export default MessageInput