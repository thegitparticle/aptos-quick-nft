import "../styles/globals.css";
import {
	WalletProvider,
	HippoWalletAdapter,
	AptosWalletAdapter,
	HippoExtensionWalletAdapter,
	MartianWalletAdapter,
	FewchaWalletAdapter,
	PontemWalletAdapter,
	SpikaWalletAdapter,
	RiseWalletAdapter,
	FletchWalletAdapter,
	TokenPocketWalletAdapter,
	ONTOWalletAdapter,
	SafePalWalletAdapter,
} from "@manahippo/aptos-wallet-adapter";

const wallets = [
	new HippoWalletAdapter(),
	new MartianWalletAdapter(),
	new AptosWalletAdapter(),
	new FewchaWalletAdapter(),
	new HippoExtensionWalletAdapter(),
	new PontemWalletAdapter(),
	new SpikaWalletAdapter(),
	new RiseWalletAdapter(),
	new FletchWalletAdapter(),
	new TokenPocketWalletAdapter(),
	new ONTOWalletAdapter(),
	new SafePalWalletAdapter(),
];

function MyApp({ Component, pageProps }) {
	return (
		<WalletProvider
			wallets={wallets}
			autoConnect={true}
			onError={(error) => {
				console.log("Handle Error Message", error);
			}}
		>
			<Component {...pageProps} />
		</WalletProvider>
	);
}

export default MyApp;
