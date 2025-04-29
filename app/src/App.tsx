import BuyCornButton from "./components/BuyCornButton";
import CornPurchasesList from "./components/CornPurchasesList";
import useClientId from "./hooks/useClientId";
import useCornShop from "./hooks/useCornShop";

function App() {
  const clientId = useClientId();
  const { buyCorn, purchases } = useCornShop({ clientId });
  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center bg-yellow-100 ">
      <h1 className="text-6xl font-semibold text-green-600">
        Bob's Corn Portal
      </h1>
      <BuyCornButton handleClick={buyCorn} />
      <CornPurchasesList
        className="mt-4 w-full max-w-2xl mx-auto"
        items={purchases}
      />
    </div>
  );
}

export default App;
