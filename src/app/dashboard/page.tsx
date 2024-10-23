"use client";

import { useEffect, useState } from 'react';
import { getGmailAuthUrl, getGmailTokens, listEmails } from '@/lib/gmail';
import { getOutlookAuthUrl, listOutlookEmails } from '@/lib/outlook';
import { classifyEmail } from '@/lib/gemini';

interface Email {
    subject: string;
    snippet: string;
}

export default function Dashboard() {
    const [emails, setEmails] = useState<Email[]>([]);
    const [authType, setAuthType] = useState<'gmail' | 'outlook' | null>(null);
    const [token, setToken] = useState<string | null>(null); // Token for Outlook

    useEffect(() => {
        const fetchEmails = async () => {
            if (authType === 'gmail') {
                // Fetch Gmail emails
                const fetchedEmails = await listEmails();
                setEmails(
                    fetchedEmails.map((email: any) => ({
                        subject: email.payload.headers.find((h: any) => h.name === 'Subject')?.value || 'No Subject',
                        snippet: email.snippet || 'No Snippet Available',
                    }))
                );
            } else if (authType === 'outlook' && token) {
                // Fetch Outlook emails
                const fetchedEmails = await listOutlookEmails(token);
                setEmails(
                    fetchedEmails.map((email: any) => ({
                        subject: email.subject || 'No Subject',
                        snippet: email.body.content || 'No Snippet Available',
                    }))
                );
            }
        };

        fetchEmails();
    }, [authType, token]);

    const handleEmailClassification = async (email: Email) => {
        const content = `${email.subject}\n${email.snippet}`;
        const result = await classifyEmail(content);
        console.log(result);
        // Handle response and display as necessary
        // Here, you could categorize the email based on result and send replies
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">Email Dashboard</h1>
                <div className="flex justify-center mb-4">
                    <button
                        onClick={() => {
                            setAuthType('gmail');
                            getGmailAuthUrl(); // Ensure to call the function to redirect or handle auth
                        }}
                        className="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Connect Gmail
                    </button>
                    <button
                        onClick={() => {
                            setAuthType('outlook');
                            // You may want to implement OAuth for Outlook here to get the token
                            getOutlookAuthUrl(); // Ensure to call the function to redirect or handle auth
                        }}
                        className="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Connect Outlook
                    </button>
                </div>
                {emails.length > 0 ? (
                    <ul className="space-y-4">
                        {emails.map((email, index) => (
                            <li key={index} className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-800">{email.subject}</h2>
                                <p className="text-gray-600 mt-2">{email.snippet}</p>
                                <button
                                    onClick={() => handleEmailClassification(email)}
                                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                                >
                                    Classify Email
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">No emails found.</p>
                )}
            </div>
        </div>
    );
}
