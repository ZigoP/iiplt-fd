import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import {Button} from "../../components/ui/button";

const ModalView = ({
    stock,
    actionType,
    isOpen,
    setIsOpen,
    quantity,
    setQuantity,
    processTrade
}) => {

    const handleProceed = () => {
        if (processTrade) processTrade()
    }

    return (
        <Dialog open={isOpen}  onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{actionType}: {stock?.name}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2 justify-center items-center">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="quantity">Stock Quantity</Label>
                        <Input
                            type="text"
                            id="quantity"
                            placeholder="0"
                            maxLength="4"
                            value={quantity}
                            onInput={e => {
                                let newValue = e.target.value.replace(/[^0-9]/g, '');

                                if (newValue !== "" && newValue[0] === "0") {
                                    newValue = newValue.replace(/^0+/, '');
                                }
                                setQuantity(newValue === "" ? "0" : newValue);
                            }}
                        />

                    </div>
                    <Button onClick={() => handleProceed()} disabled={quantity === 0}>Proceed</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ModalView