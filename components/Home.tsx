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

	function TabBar() {
		return (
			<div className="flex sticky top-0 z-40 w-full flex-row duration-500 items-center justify-between">
				<p className="text-2xl text-emerald-800 font-body font-bold mx-24 my-6">
					QuickNFT on Aptos
				</p>
				<p className="text-md text-emerald-500 font-body font-bold mx-24 my-6">
					{account.address.toString().slice(0, 5) +
						"..." +
						account.address
							.toString()
							.slice(
								account.address.toString().length - 5,
								account.address.toString().length
							)}
				</p>
			</div>
		);
	}

	function MintNFT() {
		const [nftName, setNftName] = useState("");
		const [nftDescription, setNftDescription] = useState("");
		const [nftUri, setNftUri] = useState("");

		const updateName = (event) => {
			setNftName(event.target.value);
		};

		const updateUri = (event) => {
			setNftUri(event.target.value);
		};

		const updateDescription = (event) => {
			setNftDescription(event.target.value);
		};

		const supply = 1;

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
					).catch((err) => console.log("nft minting failed" + err));
				})
				.catch((e) => console.log("collection creation failed" + e));
		};

		return (
			<div className="flex flex-col items-center justify-center w-full h-screen">
				<p className="text-md text-emerald-500 font-body font-bold my-4">
					Make an NFT of any media asset with a link instantly!
				</p>
				<div className="flex items-start flex-col w-3/6 my-4">
					<p className="text-md text-emerald-500 font-body font-bold my-1">
						Paste the url of media asset
					</p>
					<input
						type="uri"
						id="uri"
						name="uri"
						required
						minLength={3}
						maxLength={100}
						onChange={(event) => updateUri(event)}
						className="flex h-10 w-full bg-emerald-800/25 text-md text-emerald-500 font-body font-bold text-center rounded-xl"
					/>
				</div>
				<div className="flex items-start flex-col w-3/6 my-4">
					<p className="text-md text-emerald-500 font-body font-bold my-1">
						Name your NFT
					</p>
					<input
						type="text"
						id="name"
						name="name"
						required
						minLength={3}
						maxLength={30}
						onChange={updateName}
						className="flex h-10 w-full bg-emerald-800/25 text-md text-emerald-500 font-body font-bold text-center rounded-xl"
					/>
				</div>
				<div className="flex items-start flex-col w-3/6 my-4">
					<p className="text-md text-emerald-500 font-body font-bold my-1">
						Description (optional)
					</p>
					<input
						type="text"
						id="description"
						name="description"
						minLength={3}
						maxLength={100}
						onChange={updateDescription}
						className="flex h-10 w-full bg-emerald-800/25 text-md text-emerald-500 font-body font-bold text-center rounded-xl"
					/>
				</div>
				<button
					onClick={() => createNewNft()}
					className="flex py-3 px-6 bg-emerald-700 rounded-full text-emerald-100 font-body font-bold text-md my-4"
				>
					Mint NFT
				</button>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center w-screen h-full absolute">
			<TabBar />
			<MintNFT />
		</div>
	);
}
