import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import MobileNav from "@/components/MobileNav";
import DesktopNav from "@/components/DesktopNav";
import React from "react";
import { auth } from "@/auth";


const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Memora",
	description: "Connect your Memories",
};

export default async function RootLayout({
	children,
	modal
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode,
}>) {
	const session = await auth()
	const isLoggedIn = !!session
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Theme>
					{modal}
					<div className="flex min-h-screen">
						{isLoggedIn && (
							<DesktopNav />
						)}
						<div className="pb-24 lg:pb-4 px-4 md:px-8 pt-4 flex justify-around w-full">
							<div className="w-full">
								{children}
							</div>
						</div>
					</div>
					{isLoggedIn && (
						<MobileNav />
					)}
				</Theme>
			</body>
		</html>
	);
}
