import { Button } from "./ui/button";

type Props = {
  className?: string;
  handleClick: () => void;
};

const BuyCornButton = ({ className = "", handleClick }: Props) => {
  return (
    <Button size={"lg"} className={className} onClick={() => handleClick()}>
      Buy Corn 🌽
    </Button>
  );
};

export default BuyCornButton;
