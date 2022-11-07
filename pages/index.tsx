import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Quick NFT Aptos</title>
				<meta
					name="description"
					content="Generate an nft quickly on aptos blockchain"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className="text-lg text-emerald-800">
					Generate an NFT on Aptos
				</h1>

				<p className="text-sm text-emerald-500">
					Get started by a link to image or video below.
				</p>
			</main>

			<footer className={styles.footer}>QuickNFT</footer>
		</div>
	);
}
