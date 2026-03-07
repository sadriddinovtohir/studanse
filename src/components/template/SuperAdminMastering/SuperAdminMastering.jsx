import React from "react";
import { Shield, UserPlus } from "lucide-react";
import { item } from "./data";
import { Button } from "@/components/ui/button";
import { Outlet, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export default function SuperAdminMastering() {
    const navigate = useNavigate();
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
                    <UserPlus className="h-6 w-6 text-orange-500" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">
                    Mastering
                </h1>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {item?.map((i) => {
                    const Icon = i.icon;
                    return (
                        <li
                            key={i.id}
                            className={`p-4 text-center rounded-xl backdrop-blur-xl bg-gradient-to-br ${i.gradient} border ${i.borderColor} rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer`}
                            style={{ backgroundColor: i.bgColor }}
                        >
                            <div className="text-center pb-4">
                                <div className="mx-auto mb-4 p-4 rounded-2xl bg-white/10 dark:bg-black/20 w-fit group-hover:scale-110 transition-transform duration-300">
                                    <Icon
                                        className={`h-8 w-8 ${i.iconColor}`}
                                    />
                                </div>
                                <h2 className="text-foreground">{i.title}</h2>
                            </div>

                            <div className="text-center space-y-4">
                                <p className="text-foreground/70 text-sm leading-relaxed">
                                    {i.text}
                                </p>
                                <Button
                                    onClick={() => navigate(i.path)}
                                    className={`w-full bg-gradient-to-r ${i.buttonGradient} hover:opacity-90 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-12`}
                                >
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Manage {i.title}
                                </Button>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <Outlet />

            <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-2xl">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-500/30 flex-shrink-0">
                            <Shield className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">
                                Entity Management
                            </h3>
                            <p className="text-foreground/70 text-sm leading-relaxed">
                                Select an entity above to manage its records.
                                You can create, read, update, and delete entries
                                for schools and admins. Each entity has its own
                                specialized form fields and validation rules.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
