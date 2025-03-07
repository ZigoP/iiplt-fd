import {getData} from "../../Services/Get/Get";
import {useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../components/ui/card";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "../../components/ui/table";
import {Button} from "../../components/ui/button";
import ModalView from "../ModalView/ModalView";
import {postData} from "../../Services/Post/Post";
import Loader from "../Loader/Loader";
import {useToast} from "../../hooks/use-toast";
import {useNavigate} from "react-router-dom";
import {Toaster} from "../../components/ui/toaster";

const Stocks = () => {
    const [stocks, setStocks] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [selectedStock, setSelectedStock] = useState({})
    const [selectedActionType, setSelectedActionType] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const { toast } = useToast()
    const navigate = useNavigate()

    const availableColumns = {
        caption: "List of available stocks",
        headers: ["Stock Name", "ISIN", "Price (USD)"],
        fields: ["name", "isin", "price"]
    };

    const availableActions = [
        { label: "Buy", handler: (element) => openModal("Buy", element) },
        { label: "Sell", handler: (element) => openModal("Sell", element) }
    ];

    useEffect(() => {
        fetchData("stocks");
    }, []);

    const fetchData = async (endpoint) => {
        getData(endpoint)
            .then(result => {
              setStocks(result)
            })
            .catch(error => {
                const errorMessage = error.message || 'An unknown error occurred';
                setError(errorMessage);
            })
    };

    const openModal = (actionType, stock) => {
      setSelectedStock(stock)
      setSelectedActionType(actionType)
      setIsOpen(true)
    }

    const processTrade = () => {
        if(selectedActionType !== "" && Object.keys(selectedStock).length !== 0){
          const body = {
              ISIN: selectedStock?.isin || "",
              Quantity: quantity || 0,
              Type: selectedActionType === "Buy" ? 1 : 2,
          }
          setIsLoading(true)
          postData("trade", body)
              .then(result => {
                  setIsLoading(false)
                  setIsOpen(false)
                  setSuccess(result?.message || "Transaction successful")
                  navigate("/", {
                      state: { highlightISIN: selectedStock?.isin || "" }
                  });
              })
              .catch(error => {
                  setIsLoading(false)
                  setIsOpen(false)
                  const errorMessage = error.message || 'An unknown error occurred';
                  setError(errorMessage);
              })
        } else {
            setError("Can't make the trade")
        }
    }

    useEffect(() => {
      if(!isOpen) {
          setQuantity(0)
          setSelectedStock({})
          setSelectedActionType("")
          setSuccess("")
          setError("")
      }
    }, [isOpen])

    useEffect(() => {
        const message = error || success || ""
        if(message !== ""){
            toast({
                variant: error ? "destructive" : "success",
                description: message,
            });
        }

    }, [error, success, toast])

    if(isLoading) return <Loader />

    return (
        <>
        <Card>
          <CardHeader className="text-2xl">
              <CardTitle>Stocks</CardTitle>
              <CardDescription>List of Stocks.</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="flex flex-col gap-2">
                  <Table>
                      <TableCaption>List of available stocks</TableCaption>
                      <TableHeader>
                          <TableRow>
                              <TableHead>Stock Name</TableHead>
                              <TableHead>ISIN</TableHead>
                              <TableHead>Price (USD)</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          { stocks
                              ? stocks.map((element, index) => (
                                  <TableRow key={`row-${index}`}>
                                      {
                                          Object.entries(element).map(([key, value]) => (
                                              <TableCell key={key}>{value} {key === "price" ? "$" : ""}</TableCell>
                                          ))
                                      }
                                      <TableCell key={`buy-${index}`} className="w-0 whitespace-nowrap">
                                          <Button className="min-w-fit" onClick={() => openModal("Buy", element)}>Buy</Button>
                                      </TableCell>
                                      <TableCell key={`sell-${index}`} className="w-0 whitespace-nowrap pr-8">
                                          <Button className="min-w-fit" onClick={() => openModal("Sell", element)}>Sell</Button>
                                      </TableCell>
                                  </TableRow>
                              ))
                              : null
                          }
                      </TableBody>
                  </Table>
              </div>
          </CardContent>
        </Card>
        <ModalView
          stock={selectedStock}
          actionType={selectedActionType}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          quantity={quantity}
          setQuantity={setQuantity}
          processTrade={processTrade}
        />
        <Toaster />
        </>
    );
}

export default Stocks;