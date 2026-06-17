/* -------------------------------------------------------------
   AgentroXAI - Interactive Website Application Logic
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================
       1. Header Scroll Effects & Mobile Navigation Toggle
       ========================================================== */
    const header = document.getElementById('main-header');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // Sticky header shadow/blur on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile nav toggle click handler
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileNavToggle.classList.toggle('mobile-nav-active');
        });
    }

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (mobileNavToggle) {
                mobileNavToggle.classList.remove('mobile-nav-active');
            }
        });
    });


    /* ==========================================================
       2. Real-time ROI & Missed Revenue Calculator
       ========================================================== */
    const customerValueInput = document.getElementById('customer-value');
    const missedCallsInput = document.getElementById('missed-calls');
    const closingRateInput = document.getElementById('closing-rate');

    const valCustomerValue = document.getElementById('val-customer-value');
    const valMissedCalls = document.getElementById('val-missed-calls');
    const valClosingRate = document.getElementById('val-closing-rate');

    const resRecoveredClients = document.getElementById('res-recovered-clients');
    const resMonthlyIncome = document.getElementById('res-monthly-income');
    const resAnnualIncome = document.getElementById('res-annual-income');
    const resRoi = document.getElementById('res-roi');

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(val);
    };

    const calculateROI = () => {
        const value = parseInt(customerValueInput.value);
        const calls = parseInt(missedCallsInput.value);
        const closingRate = parseInt(closingRateInput.value) / 100;
        
        // Update display slider labels
        valCustomerValue.textContent = formatCurrency(value);
        valMissedCalls.textContent = calls;
        valClosingRate.textContent = `${Math.round(closingRate * 100)}%`;

        // Mathematical calculation
        const recoveredClients = calls * closingRate;
        const monthlyRevenue = recoveredClients * value;
        const annualRevenue = monthlyRevenue * 12;
        
        const agentCost = 299; // Starter Plan cost
        const netProfit = monthlyRevenue - agentCost;
        const roiPercent = netProfit > 0 ? (netProfit / agentCost) * 100 : 0;

        // Populate results in DOM
        resRecoveredClients.textContent = recoveredClients.toFixed(1);
        resMonthlyIncome.textContent = formatCurrency(monthlyRevenue);
        resAnnualIncome.textContent = formatCurrency(annualRevenue);
        
        resRoi.textContent = `${Math.round(roiPercent).toLocaleString()}% ROI`;
        
        if (monthlyRevenue <= agentCost) {
            resRoi.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            resRoi.style.color = '#EF4444';
            resRoi.style.borderColor = 'rgba(239, 68, 68, 0.2)';
        } else {
            resRoi.style.backgroundColor = 'rgba(16, 185, 129, 0.12)';
            resRoi.style.color = '#10B981';
            resRoi.style.borderColor = 'rgba(16, 185, 129, 0.2)';
        }
    };

    // Attach listeners
    if (customerValueInput && missedCallsInput && closingRateInput) {
        [customerValueInput, missedCallsInput, closingRateInput].forEach(input => {
            input.addEventListener('input', calculateROI);
        });
        // Initial run
        calculateROI();
    }


    /* ==========================================================
       3. Interactive AI Receptionist Simulator
       ========================================================== */
    const chatContainer = document.getElementById('chat-messages-container');
    const optionsWrapper = document.getElementById('chat-options-wrapper');
    const agentNameEl = document.getElementById('sim-agent-name');
    const industryButtons = document.querySelectorAll('.sim-btn');

    // Dialogue Data Tree
    const dialogueDatabase = {
        medspa: {
            agentName: "Lumina Assistant",
            tree: {
                start: {
                    text: "Welcome to Lumina Med Spa! I'm your virtual concierge. How can I assist you with your skin revitalization or wellness goals today?",
                    options: [
                        { text: "I'd like to book a HydraFacial", next: "book_hydrafacial" },
                        { text: "What are your weekend hours?", next: "hours" },
                        { text: "Do you have any current specials?", next: "specials" }
                    ]
                },
                book_hydrafacial: {
                    text: "Excellent choice! Our Gold-Standard HydraFacial is highly requested for instant glow. I can book that for you right now. Do weekdays or weekends work best for you?",
                    options: [
                        { text: "Weekdays work best", next: "weekdays_slots" },
                        { text: "I prefer weekends", next: "weekends_slots" }
                    ]
                },
                weekdays_slots: {
                    text: "Perfect. We have openings this Thursday, June 18th at 10:00 AM or 2:30 PM. Would either of these work?",
                    options: [
                        { text: "Thursday at 10:00 AM is perfect", next: "get_contact_info" },
                        { text: "Thursday at 2:30 PM works", next: "get_contact_info" },
                        { text: "Show more times", next: "book_hydrafacial" }
                    ]
                },
                weekends_slots: {
                    text: "Saturdays are popular! Our next available slot is this Saturday at 11:30 AM or 4:00 PM. Would you like to lock one in?",
                    options: [
                        { text: "Saturday at 11:30 AM", next: "get_contact_info" },
                        { text: "Saturday at 4:00 PM", next: "get_contact_info" }
                    ]
                },
                get_contact_info: {
                    text: "Great! I have reserved that slot. To confirm your booking and send your intake forms, could you please select your phone verification preference?",
                    options: [
                        { text: "Send SMS confirmation link", next: "complete_booking" },
                        { text: "Email me confirmation details", next: "complete_booking" }
                    ]
                },
                complete_booking: {
                    text: "Appointment Secured! 🎉 You are officially scheduled. A confirmation has been dispatched. We look forward to pampering you at Lumina!",
                    isSystem: true,
                    options: [
                        { text: "Restart Demo", next: "start" }
                    ]
                },
                hours: {
                    text: "We are open Monday to Friday from 9:00 AM to 8:00 PM, Saturday from 9:00 AM to 6:00 PM, and Sunday from 10:00 AM to 4:00 PM. Would you like to schedule an appointment?",
                    options: [
                        { text: "Yes, let's book an appointment", next: "book_hydrafacial" },
                        { text: "No, thank you!", next: "exit" }
                    ]
                },
                specials: {
                    text: "This month we're offering 15% off first-time Laser Skin Resurfacing sessions, or a complimentary skin analysis with any facial package. Would you like to schedule a consultation with Dr. Lin?",
                    options: [
                        { text: "Yes, book a consultation", next: "weekdays_slots" },
                        { text: "Go back to main menu", next: "start" }
                    ]
                },
                exit: {
                    text: "No problem at all! Feel free to ask if anything else comes up. Have a beautiful day!",
                    options: [
                        { text: "Restart Demo", next: "start" }
                    ]
                }
            }
        },
        dental: {
            agentName: "Apex Dental AI",
            tree: {
                start: {
                    text: "Hello and thank you for contacting Apex Dental Clinic. I am ApexAI, your 24/7 receptionist. Are you looking to book a checkup, experiencing a toothache, or asking about insurance?",
                    options: [
                        { text: "I need to book a regular checkup", next: "checkup" },
                        { text: "I have a toothache / emergency", next: "emergency" },
                        { text: "Do you accept MetLife insurance?", next: "insurance" }
                    ]
                },
                checkup: {
                    text: "Splendid! Dental health is vital. Are you a new patient to Apex Dental, or are you returning to see us again?",
                    options: [
                        { text: "I am a new patient", next: "new_patient_date" },
                        { text: "I am a returning patient", next: "returning_patient_date" }
                    ]
                },
                new_patient_date: {
                    text: "Welcome to our family! We require a 60-minute slot for first-time cleanings and full-mouth X-rays. We have availability next Tuesday, June 23rd at 9:00 AM or 1:30 PM. Do either of those work?",
                    options: [
                        { text: "Tuesday at 9:00 AM", next: "insurance_ask" },
                        { text: "Tuesday at 1:30 PM", next: "insurance_ask" }
                    ]
                },
                returning_patient_date: {
                    text: "Welcome back! Since we have your dental records, a standard checkup takes about 45 minutes. We have openings this Friday at 3:00 PM or 4:00 PM. Would you like one?",
                    options: [
                        { text: "Friday at 3:00 PM", next: "confirm_patient" },
                        { text: "Friday at 4:00 PM", next: "confirm_patient" }
                    ]
                },
                insurance_ask: {
                    text: "Perfect. Do you have dental insurance you'd like us to pre-qualify for your appointment?",
                    options: [
                        { text: "Yes, I have dental insurance", next: "insurance_yes" },
                        { text: "No, I'll pay self-pay", next: "confirm_patient" }
                    ]
                },
                insurance_yes: {
                    text: "Perfect. We accept major PPO policies. We'll text you a secure link to upload your insurance card before Tuesday. May we confirm the appointment?",
                    options: [
                        { text: "Yes, please confirm", next: "confirm_patient" }
                    ]
                },
                confirm_patient: {
                    text: "Fantastic! Your appointment is reserved. We've sent a confirmation calendar invite and text to your mobile. See you soon!",
                    isSystem: true,
                    options: [
                        { text: "Restart Demo", next: "start" }
                    ]
                },
                emergency: {
                    text: "Oh no! I understand dental pain can be severe. We save emergency triage slots every day. Would you like me to book you for our earliest priority slot tomorrow morning at 8:30 AM?",
                    options: [
                        { text: "Yes, book me for 8:30 AM", next: "confirm_patient" },
                        { text: "No, I'll call back later", next: "exit" }
                    ]
                },
                insurance: {
                    text: "Yes, we accept MetLife, Delta Dental, Cigna, and most major PPO plans. We do not accept HMOs currently. Would you like to schedule an appointment now?",
                    options: [
                        { text: "Yes, book a checkup", next: "checkup" },
                        { text: "Go back to main menu", next: "start" }
                    ]
                },
                exit: {
                    text: "Hope your pain eases soon. Please seek medical help if it becomes severe. Take care!",
                    options: [
                        { text: "Restart Demo", next: "start" }
                    ]
                }
            }
        },
        legal: {
            agentName: "Vance Law Assistant",
            tree: {
                start: {
                    text: "Welcome to Vance Law Group. I am your virtual intake coordinator. To help me guide you, does your legal matter involve family law, personal injury, or corporate consulting?",
                    options: [
                        { text: "I need help with family law / divorce", next: "family_law" },
                        { text: "I was injured in a car accident", next: "accident" },
                        { text: "What are your consultation fees?", next: "fees" }
                    ]
                },
                family_law: {
                    text: "I understand. Family disputes require careful attention. We offer a private, confidential case analysis call with managing attorney Arthur Vance. Shall we book that for you?",
                    options: [
                        { text: "Yes, let's book it", next: "schedule_vance" },
                        { text: "No, just browsing", next: "exit" }
                    ]
                },
                schedule_vance: {
                    text: "Arthur Vance has initial availability next Monday at 2:00 PM or 4:00 PM for private reviews. Which slot works best?",
                    options: [
                        { text: "Monday at 2:00 PM", next: "law_contact" },
                        { text: "Monday at 4:00 PM", next: "law_contact" }
                    ]
                },
                law_contact: {
                    text: "Got it. To secure this legal consult and dispatch the secure Zoom conference credentials, please select your preferred phone verification method:",
                    options: [
                        { text: "Send Zoom link via SMS", next: "law_complete" },
                        { text: "Email me conference details", next: "law_complete" }
                    ]
                },
                law_complete: {
                    text: "Consultation Booked! ⚖️ Arthur Vance's calendar has locked in your meeting. Check your details shortly. Rest assured, your matter is treated with strict confidentiality.",
                    isSystem: true,
                    options: [
                        { text: "Restart Demo", next: "start" }
                    ]
                },
                accident: {
                    text: "We are sorry you had to go through that. Speed is crucial for insurance claim preservation. Our accident intake attorney can speak with you today. Can I get your mobile number to send an instant call invitation?",
                    options: [
                        { text: "Yes, text me the call invite link", next: "law_complete" },
                        { text: "No, I'll call the office later", next: "exit" }
                    ]
                },
                fees: {
                    text: "We offer a complimentary initial 15-minute case evaluation call. Deeper legal evaluations requiring case file reviews are billed hourly. Would you like to schedule the free 15-minute call today?",
                    options: [
                        { text: "Yes, book the free 15-minute call", next: "schedule_vance" },
                        { text: "Go back to main menu", next: "start" }
                    ]
                },
                exit: {
                    text: "Thank you for visiting Vance Law Group. If you require legal counsel in the future, we are here to support you. Goodbye.",
                    options: [
                        { text: "Restart Demo", next: "start" }
                    ]
                }
            }
        }
    };

    let activeIndustry = "medspa";
    let activeNode = "start";

    const loadChatSimulator = (industryKey) => {
        activeIndustry = industryKey;
        activeNode = "start";
        
        const config = dialogueDatabase[industryKey];
        if (!config) return;

        // Set agent name header
        agentNameEl.textContent = config.agentName;
        
        // Clear chat area
        chatContainer.innerHTML = '';
        optionsWrapper.innerHTML = '';

        // Inject initial agent message
        triggerAgentMessage(config.tree.start);
    };

    const triggerAgentMessage = (nodeData) => {
        // Show typing indicator
        showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator();

            // Append message bubble
            const bubble = document.createElement('div');
            bubble.classList.add('chat-msg');
            
            if (nodeData.isSystem) {
                bubble.classList.add('system-event');
            } else {
                bubble.classList.add('agent');
            }
            
            bubble.innerHTML = nodeData.text;
            chatContainer.appendChild(bubble);
            chatContainer.scrollTop = chatContainer.scrollHeight;

            // Render option buttons
            renderOptions(nodeData.options);

        }, 900); // 900ms simulated thinking delay
    };

    const showTypingIndicator = () => {
        const indicator = document.createElement('div');
        indicator.id = 'typing-indicator-msg';
        indicator.className = 'chat-msg agent typing-indicator';
        indicator.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        
        // Custom CSS rule injected for typing animation inside styling if needed:
        // Actually we can style it simply in javascript or add it to CSS
        chatContainer.appendChild(indicator);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    const removeTypingIndicator = () => {
        const indicator = document.getElementById('typing-indicator-msg');
        if (indicator) {
            indicator.remove();
        }
    };

    const renderOptions = (options) => {
        optionsWrapper.innerHTML = '';
        if (!options || options.length === 0) return;

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'chat-opt-btn';
            btn.textContent = opt.text;
            btn.addEventListener('click', () => {
                handleUserResponse(opt.text, opt.next);
            });
            optionsWrapper.appendChild(btn);
        });
    };

    const handleUserResponse = (userText, nextNodeKey) => {
        // Clear options
        optionsWrapper.innerHTML = '';

        // Append User bubble
        const userBubble = document.createElement('div');
        userBubble.className = 'chat-msg user';
        userBubble.textContent = userText;
        chatContainer.appendChild(userBubble);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Load next node
        const tree = dialogueDatabase[activeIndustry].tree;
        const nextNode = tree[nextNodeKey];

        if (nextNode) {
            activeNode = nextNodeKey;
            triggerAgentMessage(nextNode);
        }
    };

    // Attach Industry Selector Button Event Listeners
    industryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            industryButtons.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');
            
            const indKey = btn.getAttribute('data-industry');
            loadChatSimulator(indKey);
        });
    });

    // Initialize default simulator state
    if (chatContainer) {
        loadChatSimulator('medspa');
    }


    /* ==========================================================
       4. Strategic Audit Consultation Form Submission Simulation
       ========================================================== */
    const consultationForm = document.getElementById('consultation-form');
    const formSubmitBtn = document.getElementById('form-submit-btn');
    const formSuccessContainer = document.getElementById('form-success-container');

    if (consultationForm) {
        consultationForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop page reload

            // Basic validation check
            if (!consultationForm.checkValidity()) {
                return;
            }

            // Disable submit button & show loading state
            formSubmitBtn.disabled = true;
            const btnText = formSubmitBtn.querySelector('span');
            const originalText = btnText.textContent;
            btnText.textContent = "Processing details...";
            formSubmitBtn.style.opacity = '0.7';
            
            // Simulating API backend dispatch to Shittij
            setTimeout(() => {
                // Fade out form and fade in success container
                consultationForm.style.transition = 'opacity 0.4s ease';
                consultationForm.style.opacity = '0';
                
                setTimeout(() => {
                    consultationForm.style.display = 'none';
                    formSuccessContainer.style.display = 'block';
                    formSuccessContainer.style.opacity = '0';
                    setTimeout(() => {
                        formSuccessContainer.style.opacity = '1';
                    }, 50);
                }, 400);

            }, 1800); // 1.8s mock networking delay
        });
    }


    /* ==========================================================
       5. Scroll Entrance Fade-In Observer
       ========================================================== */
    // Creating dynamically target classes inside elements for smooth entry animations
    const animatedElements = document.querySelectorAll('.feature-card, .stat-card, .pricing-card, .testimonial-card, .calculator-result-card, .founder-card');
    
    // Style animations in CSS or append dynamically:
    // We will append styling rules to style.css for entries. Let's write them below.
    const addAnimationStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .feature-card, .stat-card, .pricing-card, .testimonial-card, .calculator-result-card, .founder-card {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .feature-card.reveal-in, .stat-card.reveal-in, .pricing-card.reveal-in, .testimonial-card.reveal-in, .calculator-result-card.reveal-in, .founder-card.reveal-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Typing indicator dot flashing */
            .typing-indicator {
                display: flex;
                align-items: center;
                gap: 4px;
                padding: 0.7rem 1.1rem;
            }
            .typing-indicator .dot {
                width: 6px;
                height: 6px;
                background-color: var(--text-secondary);
                border-radius: 50%;
                opacity: 0.3;
                animation: typingFlash 1.4s infinite both;
            }
            .typing-indicator .dot:nth-child(2) { animation-delay: 0.2s; }
            .typing-indicator .dot:nth-child(3) { animation-delay: 0.4s; }
            @keyframes typingFlash {
                0% { opacity: 0.3; }
                50% { opacity: 1; }
                100% { opacity: 0.3; }
            }
        `;
        document.head.appendChild(style);
    };
    
    addAnimationStyles();

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12
    };

    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-in');
                // Unobserve once triggered to lock animation in place
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        elementObserver.observe(el);
    });

});
