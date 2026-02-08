"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GithubLogo, GoogleLogo, EnvelopeSimple, LockKey, TreeStructure } from "@phosphor-icons/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { authClient } from "@/lib/auth-client";
import GoogleOAuthButton from "@/components/auth/google-oauth";





async function handleSignIn() {
    console.log("Sign In");
}

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGoogleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard",
            })
        } catch (err) {
            console.error("Google sign up error:", err);
            setError("Failed to sign up with Google");
        } finally {
            setLoading(false);
        }
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await authClient.signIn.email({
                email,
                password,
                callbackURL: "/dashboard",
            })
        } catch (err) {
            console.error("Email sign in error:", err);
            setError("Failed to sign in with email");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gray-50 text-gray-900">
            <div className="w-full max-w-sm flex flex-col items-center gap-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                        <TreeStructure size={20} weight="bold" />
                    </div>
                    <span>FlowTodo</span>
                </Link>

                <Card className="border-border/50 bg-white/80 backdrop-blur-xl shadow-xl w-full relative overflow-hidden">
                    {/* Subtle gradient glow effect - adjusted for light theme */}
                    <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/20 blur-3xl opacity-50" />
                    <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl opacity-50" />

                    <CardHeader className="space-y-1 text-center relative z-10">
                        <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 relative z-10">
                        <GoogleOAuthButton
                            loading={loading}
                            setLoading={setLoading}
                            error={error}
                            setError={setError}
                        />

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="w-full" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <form className="grid gap-4" onSubmit={handleSignIn}>
                            <div className="grid gap-2 group">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <EnvelopeSimple className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        className="pl-9 bg-background/50 border-input focus:border-primary/50 focus:ring-primary/20 transition-all font-medium"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2 group">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="#" className="ml-auto inline-block text-xs underline-offset-4 hover:underline text-muted-foreground hover:text-primary transition-colors">
                                        Forgot your password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <LockKey className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input
                                        id="password"
                                        placeholder="••••••••"
                                        type="password"
                                        className="pl-9 bg-background/50 border-input focus:border-primary/50 focus:ring-primary/20 transition-all font-medium"
                                        required
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/20 transition-all duration-300">
                                Sign in with Email
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center relative z-10">
                        <p className="text-sm text-muted-foreground text-center">
                            Don&apos;t have an account?{" "}
                            <Link href="/sign-up" className="text-primary font-medium hover:underline underline-offset-4 transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </CardFooter>
                </Card>

                <p className="px-8 text-center text-xs text-muted-foreground mt-6">
                    By clicking continue, you agree to our{" "}
                    <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                        Privacy Policy
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}