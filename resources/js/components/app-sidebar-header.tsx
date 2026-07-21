import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type BreadcrumbItem as BreadcrumbItemType, type SharedData } from '@/types';
import { Search, Plus, LifeBuoy, LogOut, ExternalLink, UserRound } from 'lucide-react';

// Where the shared Spurs account lives (identity provider).
const SPURS_ACCOUNT_URL = 'http://127.0.0.1:8000/me';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;
    const initials = (user?.name ?? '?')
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    const [q, setQ] = useState('');
    const search = (e: React.FormEvent) => {
        e.preventDefault();
        if (!q.trim()) return;
        router.get(route('domains.search'), { q });
    };

    return (
        <header className="border-sidebar-border/50 bg-background/80 sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b px-4 backdrop-blur md:px-6">
            {/* Left: nav + breadcrumbs */}
            <div className="flex min-w-0 items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <div className="hidden min-w-0 md:block">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>

            {/* Center: domain search */}
            <form onSubmit={search} className="mx-auto hidden w-full max-w-md items-center sm:flex">
                <div className="relative w-full">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search for a domain…"
                        className="border-input bg-muted/40 focus:border-primary focus:bg-background h-9 w-full rounded-full border pr-4 pl-9 text-sm outline-none transition"
                    />
                </div>
            </form>

            {/* Right: actions + account */}
            <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
                <Button asChild size="sm" className="hidden md:inline-flex">
                    <Link href={route('domains.register.get')}>
                        <Plus className="mr-1.5 h-4 w-4" /> Register
                    </Link>
                </Button>

                <Button variant="ghost" size="icon" className="text-muted-foreground hidden sm:inline-flex" title="Support" asChild>
                    <a href="#"><LifeBuoy className="h-[18px] w-[18px]" /></a>
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="focus:ring-primary/40 rounded-full outline-none focus:ring-2">
                            <Avatar className="h-9 w-9">
                                <AvatarFallback className="bg-gradient-to-br from-sky-500 to-indigo-600 text-sm font-semibold text-white">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-72">
                        <div className="flex flex-col items-center gap-2 px-3 py-4">
                            <Avatar className="h-14 w-14">
                                <AvatarFallback className="bg-gradient-to-br from-sky-500 to-indigo-600 text-xl font-semibold text-white">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-center">
                                <div className="text-sm font-medium">{user?.name}</div>
                                <div className="text-muted-foreground text-xs">{user?.email}</div>
                            </div>
                            <a
                                href={SPURS_ACCOUNT_URL}
                                className="border-input hover:bg-muted mt-1 inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-medium"
                            >
                                Manage your Spurs Account <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className="text-muted-foreground text-xs font-normal">Signed in via Spurs SSO</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <a href={SPURS_ACCOUNT_URL}><UserRound className="mr-2 h-4 w-4" /> Account settings</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.post(route('logout'))} className="text-red-600 focus:text-red-600">
                            <LogOut className="mr-2 h-4 w-4" /> Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
