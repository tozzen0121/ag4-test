'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { initGA, pageview, event } from './g4-tag'

// Test event function
const testGA4Event = () => {
    console.log('Testing GA4 event...')
    event({
        action: 'DashPending',
        category: 'dashboard',
        label: 'Test Button Click',
        page_name: 'C2 Generic Dashboard',
        tab_name: 'Brokerage Activities',
        value: 1,
        non_interaction: false
    })
    console.log('GA4 event sent')
}

function GA4ProviderContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        // Initialize GA4
        console.log('Initializing GA4...')
        initGA()
        console.log('GA4 initialized')

        // Test event on initial load
        testGA4Event()
    }, [])

    useEffect(() => {
        // Track page views when route changes
        if (pathname) {
            const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
            console.log('Tracking page view:', url)
            pageview(url)
        }
    }, [pathname, searchParams])

    return <>{children}</>
}

export function GA4Provider({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={null}>
            <GA4ProviderContent>{children}</GA4ProviderContent>
        </Suspense>
    )
}