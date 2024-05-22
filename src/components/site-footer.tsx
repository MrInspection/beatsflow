export default function SiteFooter() {
    return (
        <>
            <footer className="py-6 md:px-8 md:py-0 border-t-2">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                        ©️ 2024 Spectrōn, All rights reserved. Built by <a
                        href={"https://github.com/mrinspection"}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        Moussa
                    </a>
                        .
                    </p>
                </div>
            </footer>
        </>
    )
}