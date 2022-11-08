import React from "react";
import { useWallet } from "@manahippo/aptos-wallet-adapter";

export default function Home() {
	const {
		connect,
		disconnect,
		connected,
		account,
		network,
		wallet,
		...rest
	} = useWallet();

	return (
		<div className="flex flex-col items-center justify-center">
			<p className="text-lg text-emerald-800">QuickNFT</p>
			<p className="text-sm text-emerald-500">
				Make an NFT of any media asset with a link instantly!
			</p>
			<p className="text-sm text-emerald-500">{account.address}</p>
		</div>
	);
}
