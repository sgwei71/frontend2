"use client";
import { axiosInstance } from "@/api";
import { ACCESS_TOKEN_KEY, accessTokenCookie } from "@/utils/localStorage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "./components/Header";
import "./globals.css";

const queryClient = new QueryClient();

// export const metadata = {
//   title: "IBK 이전 프로젝트 관리 시스템",
//   description: "IBK 이전 프로젝트 관리 시스템",
// };

export default function RootLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = accessTokenCookie.get(ACCESS_TOKEN_KEY);

        if (token != null) {
            axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
        } else {
            router.push("/login");
        }
    }, [router]);

    return (
        <html lang="ko">
            <body className={`antialiased font-regular bg-blue-50`}>
                <QueryClientProvider client={queryClient}>
                    {pathname !== "/login" ? <Header /> : <></>}
                    <main>{children}</main>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </body>
        </html>
    );
}
