// app/employer/matches/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, CheckCircle, Filter, ArrowUpDown, Verified, Star, MapPin, MessageCircle, Phone, Info, Badge, Loader2, RefreshCw } from 'lucide-react';

interface Worker {
  id: number;
  name: string;
  skill: string;
  experience?: string;
  location: string;
  latitude?: string;
  longitude?: string;
  languages?: string[];
  bio?: string;
  profilePhoto?: string;
  hourlyRate?: number;
  dailyRate?: number;
  rating?: string; // decimal stored as string
  totalReviews?: number;
  jobsCompleted?: number;
  responseTime?: number; // in minutes
  availability?: 'available' | 'busy';
}

interface JobData {
  skill: string;
  location: string;
  budget: number;
  title: string;
}

export default function EmployerMatchesPage() {
  const router = useRouter();
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobData, setJobData] = useState<JobData>({
    skill: 'Plumber',
    location: 'Andheri West, Mumbai',
    budget: 800,
    title: 'Plumber Needed'
  });
  const [isRefreshing, setIsRefreshing] = useState(false);


  // Fetch workers based on job requirements
    const fetchWorkers = useCallback(async (refresh = false) => {
    if (refresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    
    setError(null);

    try {
      // Get current location for distance calculation
      let userLocation = null;
      try {
        userLocation = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }),
            reject,
            { timeout: 5000 }
          );
        });
      } catch (error) {
        console.log('Could not get user location:', error);
      }

      // Fetch workers based on job requirements
      const response = await fetch('/api/workers/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          skill: jobData.skill,
          location: jobData.location,
          budget: jobData.budget,
          userLocation
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setWorkers(data.workers || []);
      
    } catch (err) {
      console.error('Error fetching workers:', err);
      setError('Failed to load workers. Please try again.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [jobData.skill, jobData.location, jobData.budget]);

  // Load workers on component mount
  useEffect(() => {
    // Get job data from sessionStorage if available (from post-job flow)
    const savedJobData = sessionStorage.getItem('postedJobData');
    if (savedJobData) {
      try {
        const parsedJobData = JSON.parse(savedJobData);
        setJobData(parsedJobData);
      } catch (err) {
        console.error('Error parsing saved job data:', err);
      }
    } else {
      // Use default job data for testing if no saved data exists
      setJobData({
        title: 'Plumber Needed',
        skill: 'Plumber',
        location: 'Mumbai',
        budget: 800
      });
    }
    
    fetchWorkers();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchWorkers(false);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [fetchWorkers]);

  // Refresh workers when job data changes
  useEffect(() => {
    if (workers.length > 0) {
      fetchWorkers(false);
    }
  }, [fetchWorkers, workers.length]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchWorkers(false);
  };

  const handleHire = async (workerId: number) => {
    const worker = workers.find(w => w.id === workerId);
    if (!worker) return;
    
    try {
      // Create application/connection request
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workerId: workerId,
          jobId: null, // If you have a specific job ID
          message: `Hi ${worker.name}, I'd like to hire you for ${jobData.title}. Budget: ₹${jobData.budget}/day`
        })
      });
      
      if (response.ok) {
        alert(`Successfully connected with ${worker.name}! They will be notified.`);
        // Optionally redirect to messages or applications page
      } else {
        throw new Error('Failed to connect');
      }
    } catch {
      alert('Failed to connect with worker. Please try again.');
    }
  };

  const handleCall = (workerId: number) => {
    const worker = workers.find(w => w.id === workerId);
    if (worker) {
      alert(`Contact details will be shared after you hire ${worker.name}.`);
    }
  };

  const handleChat = (workerId: number) => {
    const worker = workers.find(w => w.id === workerId);
    if (worker) {
      router.push(`/messages?workerId=${workerId}`);
    }
  };

  // Helper functions
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatResponseTime = (minutes?: number) => {
    if (!minutes) return 'Response time not available';
    if (minutes < 60) return `Within ${minutes} mins`;
    const hours = Math.floor(minutes / 60);
    return `Within ${hours} hour${hours > 1 ? 's' : ''}`;
  };



  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#F9FAFB] dark:bg-[#101922]">
      
      {/* Page Header - Under Navigation */}
      <div className="bg-white dark:bg-[#1F2937] shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F9FAFB] dark:hover:bg-[#101922]"
          >
            <ArrowLeft className="text-[#6B7280] dark:text-[#9CA3AF] w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-[#3B82F6]">Available Workers</h2>
            <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
              {isLoading ? 'Searching...' : `${workers.length} workers found near you`}
            </p>
          </div>
          
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F9FAFB] dark:hover:bg-[#101922] disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 text-[#6B7280] dark:text-[#9CA3AF] ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <main className="flex-1 max-w-2xl mx-auto w-full p-4">
        
        {/* Success Banner */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600 dark:text-green-400 w-8 h-8" />
            <div>
              <h3 className="font-bold text-green-800 dark:text-green-300">
                Job Posted Successfully!
              </h3>
              <p className="text-sm text-green-700 dark:text-green-400">
                These verified workers match your requirements
              </p>
            </div>
          </div>
        </div>

        {/* Job Summary Card */}
        <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-[#1F2937] dark:text-gray-100 mb-1">
                Your Job: {jobData.title}
              </h3>
              <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                {jobData.location} · ₹{jobData.budget}/day
              </p>
            </div>
            <button 
              onClick={() => router.push('/employer/post-job')}
              className="text-[#3B82F6] text-sm font-medium hover:underline"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Filter/Sort */}
        <div className="flex items-center gap-3 mb-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1F2937] rounded-lg shadow-sm text-sm font-medium text-[#1F2937] dark:text-gray-100 hover:shadow-md transition-shadow">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1F2937] rounded-lg shadow-sm text-sm font-medium text-[#1F2937] dark:text-gray-100 hover:shadow-md transition-shadow">
            <ArrowUpDown className="w-4 h-4" />
            <span>Sort by Distance</span>
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-red-600 dark:text-red-400" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-300">Error Loading Workers</h3>
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
              <button
                onClick={() => fetchWorkers()}
                className="ml-auto text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#3B82F6] mx-auto mb-2" />
              <p className="text-[#6B7280] dark:text-[#9CA3AF]">Finding the best workers for you...</p>
            </div>
          </div>
        )}

        {/* No Workers State */}
        {!isLoading && !error && workers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-[#1F2937] dark:text-gray-100 mb-2">No Workers Found</h3>
            <p className="text-[#6B7280] dark:text-[#9CA3AF] mb-4">
              No workers available for {jobData.skill} in {jobData.location} right now.
            </p>
            <button
              onClick={() => router.push('/employer/post-job')}
              className="text-[#3B82F6] hover:underline"
            >
              Try a different skill or location
            </button>
          </div>
        )}

        {/* Worker Cards */}
        {!isLoading && !error && workers.length > 0 && (
          <div className="space-y-4">
            {workers.map((worker) => (
            <div
              key={worker.id}
              className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              {/* Worker Header */}
              <div className="flex items-start gap-4 mb-4">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#3B82F6] to-[#60A5FA] flex items-center justify-center text-white font-bold text-xl shrink-0">
                  {worker.profilePhoto ? (
                    <div 
                      className="w-full h-full rounded-full bg-cover bg-center"
                      style={{backgroundImage: `url(${worker.profilePhoto})`}}
                    />
                  ) : (
                    getInitials(worker.name)
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-[#1F2937] dark:text-gray-100 text-lg">
                      {worker.name}
                    </h3>
                    <Verified className="text-[#3B82F6] w-5 h-5" />
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-0.5 rounded">
                      <Star className="text-yellow-600 dark:text-yellow-400 w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">
                        {worker.rating ? parseFloat(worker.rating).toFixed(1) : '0.0'}
                      </span>
                    </div>
                    <span className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                      ({worker.totalReviews || 0} reviews)
                    </span>
                  </div>

                  {/* Experience & Location */}
                  <div className="flex flex-wrap gap-3 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                    <div className="flex items-center gap-1">
                      <Badge className="w-4 h-4" />
                      <span>{worker.experience || 'Experience not specified'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{worker.location}</span>
                    </div>
                  </div>
                  
                  {/* Bio */}
                  {worker.bio && (
                    <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-2 line-clamp-2">
                      {worker.bio}
                    </p>
                  )}
                </div>

                {/* Availability Badge */}
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  worker.availability === 'available'
                    ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                }`}>
                  {worker.availability === 'available' ? "Available" : "Busy"}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-3 bg-[#F9FAFB] dark:bg-[#101922] rounded-lg mb-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-[#3B82F6]">
                    {worker.jobsCompleted || 0}
                  </p>
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                    Jobs Done
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-[#1F2937] dark:text-gray-100">
                    {formatResponseTime(worker.responseTime)}
                  </p>
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                    Response
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-[#1F2937] dark:text-gray-100">
                    ₹{worker.dailyRate || worker.hourlyRate || 'N/A'}
                    {worker.dailyRate ? '/day' : worker.hourlyRate ? '/hr' : ''}
                  </p>
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                    Rate
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleHire(worker.id)}
                  className="flex-1 bg-[#3B82F6] text-white py-3 rounded-lg font-semibold hover:bg-[#3B82F6]/90 transition-all hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Hire Now</span>
                </button>
                
                <button
                  onClick={() => handleChat(worker.id)}
                  className="w-12 h-12 flex items-center justify-center border-2 border-[#3B82F6] text-[#3B82F6] rounded-lg hover:bg-[#3B82F6]/5 transition-colors"
                  title="Chat"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>

                <button
                  onClick={() => handleCall(worker.id)}
                  className="w-12 h-12 flex items-center justify-center border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                  title="Call"
                >
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-6 flex items-start gap-2 text-sm text-[#6B7280] dark:text-[#9CA3AF] bg-white dark:bg-[#1F2937] rounded-lg p-4">
          <Info className="w-4 h-4 mt-0.5 shrink-0" />
          <p>
            Workers&apos; contact details will be shared after you hire them. All workers are verified with phone and identity checks.
          </p>
        </div>

      </main>
    </div>
  );
}
