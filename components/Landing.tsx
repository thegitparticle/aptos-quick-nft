import React, { useEffect, useState } from "react";
import { useWallet } from "@manahippo/aptos-wallet-adapter";

export default function Landing() {
	const { connect, connected, disconnect, wallets } = useWallet();

	const [walletName, setWalletName] = useState(null);

	useEffect(() => {
		wallets.map((wallet) => console.log(typeof wallet.adapter.name));
		wallets.map((wallet) => {
			if (wallet.adapter["name"] === "Martian") {
				setWalletName(wallet.adapter.name);
			}
		});
	}, []);

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="flex flex-col items-center justify-center my-8">
				<p className="text-2xl text-emerald-800 font-body font-bold my-1">
					QuickNFT on Aptos
				</p>
				<p className="text-md text-emerald-500 font-body font-bold my-1">
					Make an NFT of any media asset with a link instantly!
				</p>
			</div>
			<button
				onClick={() => connect(walletName)}
				className="flex py-3 px-6 bg-emerald-700 rounded-full text-emerald-100 font-body font-bold text-md my-8"
			>
				Connect Wallet
			</button>
		</div>
	);
}
