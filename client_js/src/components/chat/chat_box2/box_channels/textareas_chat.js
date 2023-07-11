import React, { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
// Messages
import { useSelector, useDispatch } from "react-redux";
import {
  sendMessage,
  fetchAndListenForMessages,
} from "../../../../slices/messagesSlice";
export default function Textareas_UI({ foundItem }) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  //Lấy id_user của tài khoản
  const id_user = useSelector((state) => state.authUser.id_user);
  console.log("text", id_user);
  const [comment, setComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [emojiData] = useState(data);

  const handleChange = (event) => {
    setComment(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Cấu hình chat
    // Lấy dữ liệu từ form
    const messageData = {
      content: event.target.message.value,
      sender_id: id_user,
      receiver_id: foundItem.key,
    };
    // Reset lại input
    event.target.reset();
    dispatch(sendMessage(messageData));

    /////
    // TODO: Xử lý logic để gửi comment đi
    // console.log("Comment:", comment + emoji);
    
   
  };

  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleSelectEmoji = (selectedEmoji) => {
    setEmoji(selectedEmoji.native);
    setComment(comment + selectedEmoji.native);
  };

  const displayComment = comment + emoji;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col justify-between h-24 font-normal text-sm  focus:outline-none rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-lg  ">
          <div>
            <input
              type="text"
              name="message"
              placeholder="Add a Messages!"
              className="w-full h-15  font-normal text-sm outline-none  "
            />
          </div>
          <div className="relative h-1/2 mt-4 flex">
            <span className="absolute inset-y-0 flex items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  ></path>
                </svg>
              </button>
            </span>

            <div className="absolute right-0 items-center inset-y-0 gap-3 hidden sm:flex">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Filled"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-gray-600 opacity-80"
                >
                  <path d="M17,11H13V7a1,1,0,0,0-2,0v4H7a1,1,0,0,0,0,2h4v4a1,1,0,0,0,2,0V13h4a1,1,0,0,0,0-2Z" />
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                onClick={handleToggleEmojiPicker}
                className="inline-flex items-center justify-center rounded-xl border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>
              <span
                aria-hidden="true"
                className="block h-6 w-px rounded-full bg-gray-200"
              ></span>
              <button
                variant="primary"
                type="submit"
                className="inline-flex items-center justify-center rounded-xl border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-blue-300  focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Outline"
                  viewBox="0 0 24 24"
                  className="h-5 w-5  transdiv opacity-80"
                >
                  <path d="M23.119.882a2.966,2.966,0,0,0-2.8-.8l-16,3.37a4.995,4.995,0,0,0-2.853,8.481L3.184,13.65a1,1,0,0,1,.293.708v3.168a2.965,2.965,0,0,0,.3,1.285l-.008.007.026.026A3,3,0,0,0,5.157,20.2l.026.026.007-.008a2.965,2.965,0,0,0,1.285.3H9.643a1,1,0,0,1,.707.292l1.717,1.717A4.963,4.963,0,0,0,15.587,24a5.049,5.049,0,0,0,1.605-.264,4.933,4.933,0,0,0,3.344-3.986L23.911,3.715A2.975,2.975,0,0,0,23.119.882ZM4.6,12.238,2.881,10.521a2.94,2.94,0,0,1-.722-3.074,2.978,2.978,0,0,1,2.5-2.026L20.5,2.086,5.475,17.113V14.358A2.978,2.978,0,0,0,4.6,12.238Zm13.971,7.17a3,3,0,0,1-5.089,1.712L11.762,19.4a2.978,2.978,0,0,0-2.119-.878H6.888L21.915,3.5Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </form>
      {showEmojiPicker && (
        <Picker
          data={emojiData}
          /* onEmojiSelect={console.log} */
          onSelect={handleSelectEmoji}
          style={{ position: "absolute", bottom: "60px", right: "10px" }}
        />
      )}
    </div>
  );
}
