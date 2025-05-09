export function getCurrentMonthStart(): string {
    const now = new Date()

    // Dátum lekérdezése
    const year: number = now.getFullYear();
    const month: string = (now.getMonth() + 1).toString().padStart(2, "0")  // 0-tól indexelt

    return `${year}-${month}-01`
}

export function getCurrentMonth(): string {
    const now = new Date()

    // Dátum lekérdezése
    const year: number = now.getFullYear();
    const month: string = (now.getMonth() + 1).toString().padStart(2, "0")  // 0-tól indexelt

    return `${year}-${month}`
}

export function getTodayDate(): string {
    const now = new Date()

    // Dátum lekérdezése
    const year: number = now.getFullYear();
    const month: string = (now.getMonth() + 1).toString().padStart(2, "0")  // 0-tól indexelt
    const day: string = (now.getDate()).toString().padStart(2, "0")

    return `${year}-${month}-${day}`
}

export function formatDate(date: string) {
    if (!date || date.length < 0) return ""
    return date.slice(0,10)
}

export function currencyFormat(value: number) {
    return value.toLocaleString('hu-HU', {
        style: 'currency',
        currency: 'HUF',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    });
}