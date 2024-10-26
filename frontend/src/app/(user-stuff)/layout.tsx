import { ThemeProvider } from '@/components/theme-provider';
import { MobileHeader } from '@/entities/mobile-header';
import { ModalNovo } from '@/features/modal-novo/ui';
import { SideBar } from '@/features/side-bar/ui';
import { inter } from '@/shared/lib/fonts';
import { Toaster } from '@/shared/ui/toaster';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import '../globals.css';
<link rel="icon" type="image/png" href="favicon.ico" sizes="48x48" />;

export const metadata: Metadata = {
    title: 'Pharus',
    description: 'O seu app para controle financeiro',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt">
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </head>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="flex h-screen w-full flex-row bg-background">
                        <SideBar />
                        <div className="w-full overflow-y-scroll">
                            <MobileHeader />
                            {children}
                            <Toaster />
                        </div>
                        <ModalNovo />
                    </main>
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    );
}
