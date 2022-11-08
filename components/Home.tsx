import React, { useState } from "react";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import {
	AptosClient,
	AptosAccount,
	FaucetClient,
	TokenClient,
	CoinClient,
	AptosAccountObject,
} from "aptos";

export const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const MAX_U64_BIG_INT: bigint = BigInt(2 ** 64) - BigInt(1);

export function createCollectionPayload(
	name: string,
	description: string,
	uri: string
) {
	return {
		type: "entry_function_payload",
		function: "0x3::token::create_collection_script",
		type_arguments: [],
		arguments: [
			name,
			description,
			uri,
			MAX_U64_BIG_INT.toString(),
			[false, false, false],
		],
	};
}

function createTokenPayload(
	collection: string,
	name: string,
	description: string,
	uri: string,
	royaltyPayee: string
) {
	return {
		type: "entry_function_payload",
		function: "0x3::token::create_token_script",
		type_arguments: [],
		arguments: [
			collection,
			name,
			description,
			"1",
			MAX_U64_BIG_INT.toString(),
			uri,
			royaltyPayee,
			"100",
			"0",
			[false, false, false, false, false],
			[],
			[],
			[],
		],
	};
}

export default function Home() {
	const [nftName, setNftName] = useState("silnft1");
	const [nftDescription, setNftDescription] = useState(
		"quick-nft-test-creations"
	);
	const [nftUri, setNftUri] = useState(
		"https://images.unsplash.com/photo-1667249744516-d604786b8e4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
	);

	const supply = 1;

	const {
		connect,
		disconnect,
		connected,
		account,
		network,
		wallet,
		signAndSubmitTransaction,
		...rest
	} = useWallet();
	const client = new AptosClient(NODE_URL);

	// tokenClient is used to interact with the token contract
	const tokenClient = new TokenClient(client);
	// coinClient is used to interact with the coin contract for checking balances
	const coinClient = new CoinClient(client);

	const createNewNft = async () => {
		// Create a new collection
		signAndSubmitTransaction(
			createCollectionPayload(
				nftName + " collection",
				nftDescription,
				nftUri
			),
			{ gas_unit_price: 100 }
		)
			.then((res) => {
				// create a new NFT
				signAndSubmitTransaction(
					createTokenPayload(
						nftName + " collection",
						nftName,
						nftDescription,
						nftUri,
						""
					),
					{ gas_unit_price: 100 }
				).catch((err) => console.log("nft minting failed" + e));
			})
			.catch((e) => console.log("collection creation failed" + e));
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<p className="text-lg text-emerald-800">QuickNFT</p>
			<p className="text-sm text-emerald-500">
				Make an NFT of any media asset with a link instantly!
			</p>
			<p className="text-sm text-emerald-500">{account.address}</p>
			<button onClick={() => createNewNft()}>Mint NFT</button>
		</div>
	);
}
