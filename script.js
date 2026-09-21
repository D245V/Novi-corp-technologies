const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Manejo del tema claro/oscuro
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
} else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
    }
}

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = 'light';

    if (currentTheme === 'light' || !currentTheme) {
        newTheme = 'dark';
        themeIcon.textContent = '☀️';
    } else {
        newTheme = 'light';
        themeIcon.textContent = '🌙';
    }

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

/* --- DATOS Y LÓGICA DEL MODAL --- */
const projectData = {
    heliosgrid: {
        tag: "Energías Limpias",
        title: "HeliosGrid Atacama Hub",
        image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80",
        description: "Microred inteligente que integra almacenamiento solar distribuido con algoritmos de predicción meteorológica para optimizar el suministro de energía.",
        metrics: [
            { val: "45 MW", label: "CAPACIDAD INSTALADA" },
            { val: "12,000", label: "HOGARES ABASTECIDOS" },
            { val: "-38%", label: "PÉRDIDA EN TRANSMISIÓN" }
        ],
        stack: ["Python", "TensorFlow", "IoT Edge", "Solar Analytics"]
    },
    amazonia: {
        tag: "Carbon Capture",
        title: "Amazonia Carbon-Ledger",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
        description: "Monitoreo satelital y sensores en tierra para auditar la captura de carbono forestal con registro transparente en blockchain.",
        metrics: [
            { val: "150k Ha", label: "BOSQUE MONITOREADO" },
            { val: "100%", label: "AUDITORÍA TRANSPARENTE" },
            { val: "500k Ton", label: "CO2 CERTIFICADO" }
        ],
        stack: ["Solidity", "Rust", "LoRaWAN", "Satellites API"]
    },
    codeclean: {
        tag: "Green Software",
        title: "CodeClean Engine",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
        description: "Motor de optimización algorítmica que reduce las llamadas a servidor innecesarias y disminuye el impacto de carbono del cómputo.",
        metrics: [
            { val: "-42%", label: "CONSUMO DE CPU" },
            { val: "2.1x", label: "VELOCIDAD DE CARGA" },
            { val: "15 GWh", label: "AHORRO ANUAL EST." }
        ],
        stack: ["WebAssembly", "Go", "Docker", "Carbon SDK"]
    },
    ecogrid: {
        tag: "Smart City",
        title: "EcoGrid OS v4.2",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
        description: "Plataforma de IA distribuida instalada en 14 parques industriales para optimizar el consumo de HVAC y climatización en tiempo real.",
        metrics: [
            { val: "-40%", label: "CONSUMO HVAC" },
            { val: "14", label: "PARQUES INDUSTRIALES" },
            { val: "A+", label: "EFICIENCIA ENERGÉTICA" }
        ],
        stack: ["Node.js", "MQTT", "Zigbee", "React"]
    },
    biosensor: {
        tag: "Agrotech Sostenible",
        title: "BioSensor Water: Riego por Capilaridad Guiado por IA",
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1000&q=80",
        description: "Red de mallas de sensores de humedad de suelo que optimizan el riego agrícola inteligente reduciendo la huella hídrica.",
        metrics: [
            { val: "-55%", label: "CONSUMO DE AGUA" },
            { val: "+30%", label: "RENDIMIENTO CULTIVO" },
            { val: "0 Litros", label: "AGUA DESPERDICIADA" }
        ],
        stack: ["Arduino", "NB-IoT", "Python", "Dashboard AI"]
    },
    lowcarbon: {
        tag: "Clean Computing",
        title: "LowCarbon Cloud Router",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80",
        description: "Enrutador de microservicios que desplaza cargas pesadas de cómputo hacia regiones con exceso de energía limpia instantánea.",
        metrics: [
            { val: "-90%", label: "HUELLA DE SERVIDORES" },
            { val: "99.99%", label: "UPTIME GARANTIZADO" },
            { val: "100%", label: "ENERGÍA RENOVABLE" }
        ],
        stack: ["Kubernetes", "GraphQL", "Python", "Solar Tracker"]
    }
};

const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const modalCloseBtn = document.getElementById('modal-close');
const interactiveCards = document.querySelectorAll('.interactive-card');

function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    modalContent.innerHTML = `
        <div class="modal-banner">
            <img src="${project.image}" alt="${project.title}" class="modal-banner-img">
        </div>
        <div class="modal-body-wrapper">
            <div class="modal-header">
                <span class="project-tag">${project.tag}</span>
                <h3>${project.title}</h3>
            </div>
            <div class="modal-body">
                <p>${project.description}</p>
                
                <div class="modal-metrics">
                    ${project.metrics.map(m => `
                        <div class="metric-box">
                            <strong>${m.val}</strong>
                            <span>${m.label}</span>
                        </div>
                    `).join('')}
                </div>

                <strong class="tech-title">Tecnologías Utilizadas:</strong>
                <div class="modal-tech-stack">
                    ${project.stack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
}

interactiveCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        openProjectModal(projectId);
    });
});

modalCloseBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }
});