import React, { useEffect } from "react";
import store from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setSelectedUser } from "../redux/userSlice";
import { setMessage } from "../redux/messageSlice";

const useGetMessages = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  return useEffect(() => {
    const fetchMessages = async () => {
      try {
        axios.default.withCredentials = true;

        const res = await axios.get(
          `http://localhost:8000/api/v1/message/${selectedUser?._id}`
        );

        dispatch(setMessage(res.data));
      } catch (err) {
        console.log("in usegetmesg hook error", err);
      }
    };
    fetchMessages();
  }, [selectedUser]);
};

export default useGetMessages;
