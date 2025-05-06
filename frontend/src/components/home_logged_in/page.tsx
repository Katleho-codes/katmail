import useEmails from "@/hooks/emails/useEmails"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useState } from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


const HomeLoggedIn = () => {
    const [filtering, setFiltering] = useState("")
    const [addEmailModal, setAddEmailModal] = useState(false)
    const {
        emailList,
        emailListLoading,
        fetchEmails,
        addEmail,
        createEmailErrors,
        createEmailLoading,
        totalPages,
        currentPage,
    } = useEmails()

    const handlePageChange = (page: number) => {
        fetchEmails(page);
    };

    return (
        <div className="container p-1 mx-auto lg:w-[1080px]">
            <div className="flex items-center justify-between gap-3">
                <div className="flex-grow min-w-[200px] my-3">
                    <div className="relative">
                        <MagnifyingGlassIcon
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                        />
                        <Input
                            type="text"
                            id="simple-search"
                            placeholder="Search..."
                            className="placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm pl-10 pr-4 py-2 shadow-none border border-gray-200 rounded-md focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none"
                            value={filtering}
                            onChange={(e) => setFiltering(e.target.value)}
                        />
                    </div>
                </div>
                <Button type="button" onClick={() => setAddEmailModal(true)} className="rounded-sm cursor-pointer">Create email</Button>
            </div>
            <Card className="shadow-none border-gray-200 hover:shadow-sm transition rounded-sm cursor-pointer mb-2 p-2">
                <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full overflow-hidden">
                        <h2 className="text-base font-medium text-gray-800 whitespace-nowrap">Katleho Mabala</h2>
                        <h3 className="text-sm font-semibold text-gray-600 truncate w-[200px]">Assignment reminder</h3>
                        <p className="text-sm text-gray-500 truncate w-full sm:w-[300px]">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse soluta...
                        </p>
                    </div>
                </CardContent>
            </Card>
            {
                addEmailModal && <Dialog open={addEmailModal} onOpenChange={() => setAddEmailModal(false)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            }


            <div>
                {
                    emailListLoading ? <p>Loading...</p> :
                        <>

                            {[...Array(totalPages)]?.map((_, index) => (
                                <Button
                                    type="button"
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    disabled={currentPage === index + 1}
                                >
                                    {index + 1}
                                </Button>
                            ))}
                        </>
                }

            </div>
        </div>

    )
}

export default HomeLoggedIn