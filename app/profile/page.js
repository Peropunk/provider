'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { User, LogOut, Phone, Heart, Calendar, Trash2, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SavedProperties from './SavedProperties';
import ScheduledVisits from './ScheduledVisits';

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('saved'); // saved, visits
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const handleDeleteAccount = () => {
        // UI only for now
        setShowDeleteConfirm(false);
        alert('Delete account request submitted (UI Demo Only)');
    };

    if (!user) {
        return null; // Or a loading spinner
    }

    const tabs = [
        { id: 'saved', label: 'Saved Properties', icon: Heart },
        { id: 'visits', label: 'Scheduled Visits', icon: Calendar },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-32 sm:h-48 relative">
                        <div className="absolute -bottom-16 left-8">
                            <div className="w-32 h-32 rounded-full bg-white p-2 shadow-lg">
                                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                    <User size={64} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 pb-4 px-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{user.username || user.name || 'Student'}</h1>
                                <p className="text-gray-500 flex items-center mt-1">
                                    <Phone size={16} className="mr-2" />
                                    {user.phone || user.email || 'No contact info'}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="flex items-center px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm"
                                >
                                    <Trash2 size={16} className="mr-2" />
                                    Delete Account
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
                                >
                                    <LogOut size={16} className="mr-2" />
                                    Logout
                                </button>
                            </div>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="flex border-b border-gray-200 mt-8 overflow-x-auto no-scrollbar">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${isActive
                                            ? 'border-indigo-600 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        <Icon size={18} className={`mr-2 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Tab Content */}
                        <div className="py-8 min-h-[400px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {activeTab === 'saved' && (
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900 mb-6">Your Saved Properties</h2>
                                            <SavedProperties />
                                        </div>
                                    )}

                                    {activeTab === 'visits' && (
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900 mb-6">Your Scheduled Visits</h2>
                                            <ScheduledVisits />
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Delete Account Modal */}
            <AnimatePresence>
                {showDeleteConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center text-red-600">
                                    <AlertTriangle className="mr-2" size={20} />
                                    Delete Account
                                </h3>
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-600 mb-4">
                                    Are you sure you want to delete your account? This action is irreversible and all your data, including saved properties and visit history, will be permanently removed.
                                </p>
                                <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-sm text-red-800 mb-6">
                                    <strong>Warning:</strong> You will lose access to all your booked visits and payments history.
                                </div>
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDeleteAccount}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                                    >
                                        Yes, Delete My Account
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
