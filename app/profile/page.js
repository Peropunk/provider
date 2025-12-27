'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { User, LogOut, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    if (!user) {
        return null; // Or a loading spinner
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-32 sm:h-48 relative">
                        <div className="absolute -bottom-16 left-8">
                            <div className="w-32 h-32 rounded-full bg-white p-2 shadow-lg">
                                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                    <User size={64} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 pb-8 px-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{user.username || user.name || 'Student'}</h1>
                                <p className="text-gray-500 flex items-center mt-1">
                                    <Phone size={16} className="mr-2" />
                                    {user.phone || user.email || 'No contact info'}
                                </p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
                            >
                                <LogOut size={16} className="mr-2" />
                                Logout
                            </button>
                        </div>

                        <div className="border-t border-gray-100 pt-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h2>
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">User ID</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user.id}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Account Type</dt>
                                    <dd className="mt-1 text-sm text-gray-900">Student</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Joined</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
