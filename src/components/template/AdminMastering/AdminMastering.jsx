import React, { useState } from "react";
import { item } from "./data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, UserPlus } from "lucide-react";
import AdminMasteringTable from "./AdminMasteringTable";

export default function AdminMastering() {
    const [selectedEntity, setSelectedEntity] = useState();

    return (
        <div>
            {!selectedEntity && (
                <div className="p-6 space-y-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
                            <UserPlus className="h-6 w-6 text-orange-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground">
                            Mastering
                        </h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {item.map((config) => {
                            const Icon = config.icon;

                            return (
                                <Card
                                    key={config.type}
                                    className={`backdrop-blur-xl bg-gradient-to-br ${config.gradient} border ${config.borderColor} rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer`}
                                    onClick={() =>
                                        setSelectedEntity(config.type)
                                    }
                                >
                                    <CardHeader className="text-center pb-4">
                                        <div className="mx-auto mb-4 p-4 rounded-2xl bg-white/10 dark:bg-black/20 w-fit group-hover:scale-110 transition-transform duration-300">
                                            <Icon
                                                className={`h-8 w-8 ${config.iconColor}`}
                                            />
                                        </div>
                                        <CardTitle className="text-foreground">
                                            {config.title}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent className="text-center space-y-4">
                                        <p className="text-foreground/70 text-sm leading-relaxed">
                                            {config.description}
                                        </p>

                                        <Button
                                            className={`w-full bg-gradient-to-r ${config.buttonGradient} hover:opacity-90 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-12`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedEntity(config.type);
                                            }}
                                        >
                                            <UserPlus className="h-4 w-4 mr-2" />
                                            Manage {config.title}
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

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
                                        Select an entity above to manage its
                                        records. You can create, read, update,
                                        and delete entries for students,
                                        teachers, admins, classes, lessons,
                                        subjects, and absence reasons. Each
                                        entity has its own specialized form
                                        fields and validation rules.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {selectedEntity && (
                <AdminMasteringTable
                    selectedEntity={selectedEntity}
                    setSelectedEntity={setSelectedEntity}
                />
            )}
        </div>
    );
}
