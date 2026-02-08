"use client";

import Link from "next/link";
import { useState, useRef } from "react";
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
import { EnvelopeSimple, LockKey, User, Image as ImageIcon, Camera, TreeStructure } from "@phosphor-icons/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import GoogleOAuthButton from "@/components/auth/google-oauth";



export default function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const default_image = "https://www.freepik.com/free-vector/user-blue-gradient_145856969.htm#fromView=keyword&page=1&position=0&uuid=81b78391-c486-4d34-8a77-365b4db2523d&query=Default+user"

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await authClient.signUp.email({
                email,
                password,
                name,
                image: image || default_image,
                callbackURL: "/dashboard",
            }, {
                onRequest: () => {
                    setLoading(true);
                },
                onSuccess: () => {
                    setLoading(false);
                    router.push("/dashboard");
                },
                onError: (ctx) => {
                    setLoading(false);
                    setError(ctx.error.message);
                }
            });
        } catch (err) {
            console.error("Sign up error:", err);
            setError("An unexpected error occurred");
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gray-50 text-gray-900">
            <div className="w-full max-w-sm relative flex flex-col items-center gap-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                        <TreeStructure size={20} weight="bold" />
                    </div>
                    <span>FlowTodo</span>
                </Link>

                <Card className="border-border/50 bg-white/80 backdrop-blur-xl shadow-xl w-full relative overflow-hidden z-10">
                    {/* Subtle gradient glow effect - adjusted for light theme */}
                    <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/20 blur-3xl opacity-50" />
                    <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl opacity-50" />

                    <CardHeader className="space-y-1 text-center relative z-10">
                        <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Enter your information to get started
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
                                <span className="bg-background/50 backdrop-blur-sm px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <form className="grid gap-4" onSubmit={handleSignUp}>

                            {/* Image Upload Area */}
                            <div className="flex flex-col items-center gap-2 mb-2">
                                <div
                                    className="relative w-24 h-24 rounded-full border-2 border-dashed border-muted-foreground/50 hover:border-primary cursor-pointer overflow-hidden flex items-center justify-center transition-all bg-muted/20 hover:bg-muted/40 group"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {image ? (
                                        <img src={image} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center text-muted-foreground group-hover:text-primary transition-colors">
                                            <Camera className="h-8 w-8 mb-1" />
                                            <span className="text-[10px] font-medium uppercase tracking-wide">Upload</span>
                                        </div>
                                    )}
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-xs text-white font-medium">Change</span>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                <Label className="text-xs text-muted-foreground">Profile Picture (Optional)</Label>
                            </div>

                            <div className="grid gap-2 group">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        className="pl-9 bg-background/50 border-input focus:border-primary/50 focus:ring-primary/20 transition-all font-medium"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2 group">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <EnvelopeSimple className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        className="pl-9 bg-background/50 border-input focus:border-primary/50 focus:ring-primary/20 transition-all font-medium"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2 group">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <LockKey className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-9 bg-background/50 border-input focus:border-primary/50 focus:ring-primary/20 transition-all font-medium"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/20 transition-all duration-300 mt-2">
                                {loading ? "Creating account..." : "Create account"}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center relative z-10">
                        <p className="text-sm text-muted-foreground text-center">
                            Already have an account?{" "}
                            <Link href="/sign-in" className="text-primary font-medium hover:underline underline-offset-4 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </CardFooter>
                </Card>

                <p className="px-8 text-center text-xs text-muted-foreground mt-6 relative z-10">
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
