import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"
import {useEffect, useState} from "react";
import {getData} from "../../Services/Get/Get";
import Loader from "../Loader/Loader";
import {useToast} from "../../hooks/use-toast";
import {Toaster} from "../../components/ui/toaster";
import {useLocation} from "react-router-dom";

const Profile = () => {
    const [profileData, setProfileData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const { toast } = useToast()
    const location = useLocation();

    useEffect(() => {
        fetchData("account");
    }, []);

    const fetchData = async (endpoint) => {
        setIsLoading(true)
        getData(endpoint)
            .then(result => {
                setProfileData(result)
                setIsLoading(false)
            })
            .catch(error => {
                setIsLoading(false)
                const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
                setError(errorMessage);
            })
    };

    useEffect(() => {
        const message = error || ""
        if(message !== ""){
            toast({
                variant: "destructive",
                description: message,
            });
        }

    }, [error, toast])

    if(isLoading) return <Loader />

    return (
        <>
            <Card>
            <CardHeader className="text-2xl">
              <CardTitle>Profile</CardTitle>
              <CardDescription>Information about the portfolio</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    <p className="text-xl font-bold">Balance: {profileData?.balance || 0} $</p>
                    <p><span className="text-xl font-bold">Owned Stocks</span> </p>
                    <Table>
                        <TableCaption>List of owned stocks</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Stock Name</TableHead>
                                <TableHead>ISIN</TableHead>
                                <TableHead>Price (USD)</TableHead>
                                <TableHead>Owned Stocks</TableHead>
                                <TableHead>Total Owned Stocks Price (USD)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { profileData?.portfolio
                                ? profileData?.portfolio.map((element, index) => (
                                    <TableRow key={`row-${index}`} className={`${ location.state?.highlightISIN && element?.stock?.isin === location.state?.highlightISIN ? "bg-input" : ""}`}>
                                        { element?.stock
                                            ? Object.entries(element?.stock).map(([key, value]) => (
                                                <TableCell key={key}>{value} {key === "price" ? "$" : ""}</TableCell>
                                                ))
                                            : null
                                        }
                                        <TableCell key="quantity">{element?.quantity}</TableCell>
                                        <TableCell key="totalPrice">{element?.totalPrice} $</TableCell>
                                    </TableRow>
                                ))
                                : null
                            }
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
            </Card>
            <Toaster />
        </>
    );
}

export default Profile;