"use client";

import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [gmailOAuthUrl, setGmailOAuthUrl] = useState<string | null>(null);
    const [outlookOAuthUrl, setOutlookOAuthUrl] = useState<string | null>(null);
    const [emails, setEmails] = useState<{ subject: string; snippet: string }[]>([]);

    // Fetch Gmail OAuth URL
    const fetchGmailOAuthUrl = async () => {
        try {
            const response = await fetch('/api/gmail'); // Fetch Gmail OAuth URL
            const data = await response.json();
            setGmailOAuthUrl(data.url);
        } catch (error) {
            console.error('Error fetching Gmail OAuth URL:', error);
        }
    };

    // Fetch Outlook OAuth URL
    const fetchOutlookOAuthUrl = async () => {
        try {
            const response = await fetch('/api/outlook'); // Fetch Outlook OAuth URL
            const data = await response.json();
            setOutlookOAuthUrl(data.url);
        } catch (error) {
            console.error('Error fetching Outlook OAuth URL:', error);
        }
    };

    // Fetch email classification
    const classifyEmail = async (email: { subject: string; snippet: string }) => {
        try {
            const response = await fetch('/api/classify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            console.log('Email classification:', data.classification);
        } catch (error) {
            console.error('Error classifying email:', error);
        }
    };

    useEffect(() => {
        fetchGmailOAuthUrl();
        fetchOutlookOAuthUrl();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Email Dashboard</h1>

            <div className="mt-4">
                {gmailOAuthUrl && (
                    <a href={gmailOAuthUrl} className="text-blue-500 underline">
                        Connect Gmail
                    </a>
                )}
                {outlookOAuthUrl && (
                    <a href={outlookOAuthUrl} className="text-blue-500 underline ml-4">
                        Connect Outlook
                    </a>
                )}
            </div>

            <div className="mt-8">
                <h2 className="text-xl">Emails</h2>
                <ul className="space-y-4">
                    {emails.map((email, index) => (
                        <li key={index} className="border p-4">
                            <h3 className="font-semibold">{email.subject}</h3>
                            <p>{email.snippet}</p>
                            <button
                                className="mt-2 text-sm text-blue-600 underline"
                                onClick={() => classifyEmail(email)}
                            >
                                Classify Email
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
