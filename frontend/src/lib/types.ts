export type LoginValues = {
    email: string;
    password: string;
};
export type SignupValues = {
    full_name: string;
    user_role?: string;
    user_password: string;
    created_at: string;
    email: string;
};
export type ForgotPasswordValues = {
    email: string;
};
export type TUser = {
    user_id: number;
    user_unique_id: string;
    email: string;
    full_name: string;
    user_role: string;
    repairshopr_id: number;
    department: string;
};
export type TUpdateAssessmentDate = {
    assessment_date: string;
    units_assessed: boolean;
    created_by: string | undefined;
    ticket_number: string | number;
};

export type TColumns = {
    header: string;
    accessorKey: string;
}[];

export type TTanstackPagination = {
    table: {
        setPageIndex?: (data: number) => void;
        getCanPreviousPage?: () => void;
        previousPage?: () => void;
        nextPage?: () => void;
        getCanNextPage?: () => void;
    };
};

export type Meta = {
    total_pages: number;
    total_entries: number;
    per_page: number;
    page: number;
};
export type TEmails = {
    id: number;
    unique_id: string;
    from_who: string;
    to_who: string;
    email_subject: string;
    body_html: string;
    email_status: string;
    text: string;
    sent_at: string;
    user_id: number;
};
export type TEmailsError = {
    from_who?: string;
    to_who?: string;
    email_subject?: string;
};
