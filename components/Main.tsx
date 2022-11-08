import React, { useEffect } from "react";
import Landing from "./Landing";
import { MaybeHexString, Types } from "aptos";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import Home from "./Home";

export default function Main() {
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
		<div className="flex items-center justify-center">
			{connected ? <Home /> : <Landing />}
			<button onClick={() => connect("Martian")}>
				{connected ? "Disconnect" : "Connect"}
			</button>
		</div>
	);
}
