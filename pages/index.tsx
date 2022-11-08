import Head from "next/head";
import Image from "next/image";
import Main from "../components/Main";
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

				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
					rel="stylesheet"
				></link>
			</Head>

			<main className={styles.main}>
				<Main />
			</main>

			<footer className={styles.footer}>
				<p className="text-sm text-emerald-500 font-body font-bold">
					QuickNFT
				</p>
			</footer>
		</div>
	);
}
