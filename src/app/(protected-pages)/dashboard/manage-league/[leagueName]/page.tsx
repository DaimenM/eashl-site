'use client'
import React, { use } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState,useEffect } from 'react';
import { EditLeagueDialog } from '@/components/edit-league';
import { Edit } from 'lucide-react';
import { League } from '@/types/league';
import { useLeagueStore } from '@/lib/stores/use-league-store';
import { TeamsScrollable } from '@/components/teamsScrollable';
import { AddTeamDialog } from '@/components/add-team';




export default function ManageLeague({ params }: { params: Promise<{ leagueName: string }> }) {
    const [openEdit, setOpenEdit] = useState(false);
    const [openAddTeam, setOpenAddTeam] = useState(false);
    const resolvedParams = use(params)
    const { league } = useLeagueStore();
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Manage {league.league_name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">League Details</h2>
                    <p className="mb-4">Edit league information, settings, and preferences.</p>
                    <Button 
                        className="w-full" onClick={() => setOpenEdit(true)}
                    >
                        Edit League Details
                    </Button>
                    <EditLeagueDialog open={openEdit} onOpenChange={setOpenEdit} league={league} />

                </Card>

                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Team Management</h2>
                    <p className="mb-4">Manage teams, players, and rosters.</p>
                    <TeamsScrollable />
                    <Button 
                        className="w-full"
                        onClick={() => setOpenAddTeam(true)}
                    >
                        Add Team
                    </Button>
                    <AddTeamDialog open={openAddTeam} onOpenChange={setOpenAddTeam} />
                </Card>
            </div>
        </div>
    );
}