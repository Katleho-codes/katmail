"use client";

import { TEmails, TEmailsError } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useEmails = () => {
    const [emailList, setData] = useState<TEmails[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [emailListLoading, setLoading] = useState(true);
    const [createEmailErrors, setCreateEmailErrors] = useState<TEmailsError>(
        {}
    );
    const [createEmailLoading, setCreateEmailLoading] = useState(false);

    const fetchEmails = async (page: number) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/emails?page=${page}&limit=10`,
                {
                    withCredentials: true,
                }
            );
            if (response?.data) {
                setData(response.data);
                setData(response?.data?.data);
                setCurrentPage(response?.data?.data?.meta.totalPages);
                setTotalPages(response?.data?.data?.meta.currentPage);
            }
        } catch (error: any) {
            if (error) toast.error(error?.response?.data?.error);
        } finally {
            setLoading(false);
        }
    };
    const addEmail = async (values: TEmails) => {
        setCreateEmailLoading(true);
        setCreateEmailErrors({});
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/emails`,
                values,
                {
                    withCredentials: true,
                }
            );

            return response;
        } catch (error: any) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error?.response?.data?.errors) {
                const errorMessages = Object.entries(error.response.data.errors)
                    .map(([key, entry]) => `${entry}`)
                    .join("\n");
                toast(errorMessages, {
                    duration: 10000,
                });
                setCreateEmailErrors(error.response.data.errors);
            }
        } finally {
            setCreateEmailLoading(false); // Stop loading
        }
    };
    useEffect(() => {
        fetchEmails(currentPage);
    }, [currentPage]);

    return {
        emailList,
        emailListLoading,
        fetchEmails,
        addEmail,
        createEmailErrors,
        createEmailLoading,
        totalPages,
        currentPage,
    };
};

export default useEmails;
