import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import {
  aboutMe,
  contacts,
  hero,
  models,
  navigation,
  prints,
  projects,
  resume,
  siteMeta,
} from './data/portfolioData';

const ModelViewer = lazy(() => import('./components/ModelViewer'));

const COLLAGE_MOTION_PROFILES = [
  {
    pointerX: 18,
    pointerY: 15,
    rotateX: 1.2,
    rotateY: 1.7,
    rotateZ: 0.72,
    depthZ: 18,
    driftX: 20,
    driftY: 16,
    driftDepth: 6,
    speedX: 0.44,
    speedY: 0.33,
    speedZ: 0.21,
    phaseX: 0.4,
    phaseY: 1.7,
    phaseZ: 0.9,
  },
  {
    pointerX: 12.5,
    pointerY: 10.5,
    rotateX: 0.82,
    rotateY: 1.18,
    rotateZ: 0.48,
    depthZ: 10,
    driftX: 13,
    driftY: 11,
    driftDepth: 4,
    speedX: 0.36,
    speedY: 0.29,
    speedZ: 0.19,
    phaseX: 2.2,
    phaseY: 0.6,
    phaseZ: 1.5,
  },
  {
    pointerX: 15.2,
    pointerY: 13.6,
    rotateX: 1.02,
    rotateY: 1.46,
    rotateZ: 0.63,
    depthZ: 14,
    driftX: 18,
    driftY: 14,
    driftDepth: 5,
    speedX: 0.4,
    speedY: 0.31,
    speedZ: 0.18,
    phaseX: 1.3,
    phaseY: 2.5,
    phaseZ: 2.1,
  },
  {
    pointerX: 11.2,
    pointerY: 9.3,
    rotateX: 0.76,
    rotateY: 1.06,
    rotateZ: 0.42,
    depthZ: 8,
    driftX: 12,
    driftY: 10,
    driftDepth: 3,
    speedX: 0.34,
    speedY: 0.27,
    speedZ: 0.16,
    phaseX: 2.8,
    phaseY: 1.2,
    phaseZ: 0.4,
  },
  {
    pointerX: 13.8,
    pointerY: 11.7,
    rotateX: 0.94,
    rotateY: 1.3,
    rotateZ: 0.55,
    depthZ: 12,
    driftX: 15,
    driftY: 12,
    driftDepth: 4,
    speedX: 0.38,
    speedY: 0.3,
    speedZ: 0.17,
    phaseX: 1.9,
    phaseY: 2.9,
    phaseZ: 1.1,
  },
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function updateTilt(event) {
  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  const y = (event.clientY - bounds.top) / bounds.height;
  const rotateX = (0.5 - y) * 10;
  const rotateY = (x - 0.5) * 12;

  card.style.setProperty('--tilt-rotate-x', `${rotateX.toFixed(2)}deg`);
  card.style.setProperty('--tilt-rotate-y', `${rotateY.toFixed(2)}deg`);
  card.style.setProperty('--tilt-glare-x', `${(x * 100).toFixed(2)}%`);
  card.style.setProperty('--tilt-glare-y', `${(y * 100).toFixed(2)}%`);
}

function resetTilt(event) {
  const card = event.currentTarget;

  card.style.setProperty('--tilt-rotate-x', '0deg');
  card.style.setProperty('--tilt-rotate-y', '0deg');
  card.style.setProperty('--tilt-glare-x', '50%');
  card.style.setProperty('--tilt-glare-y', '24%');
}

const tiltCardProps = {
  onMouseMove: updateTilt,
  onMouseLeave: resetTilt,
};

function SectionFrame({
  id,
  title,
  caption,
  meta,
  className = '',
  children,
  revealId,
  revealDelay = '0s',
  isRevealed = false,
  registerReveal,
}) {
  return (
    <section
      id={id}
      ref={registerReveal && revealId ? registerReveal(revealId) : undefined}
      data-reveal-id={revealId}
      className={`section-frame reveal-on-scroll ${isRevealed ? 'is-revealed' : ''} ${className}`}
      style={{ '--reveal-delay': revealDelay }}
    >
      <header className="section-frame__header">
        <div>
          <p className="micro-label">{meta}</p>
          <h2>{title}</h2>
        </div>
        <p className="section-frame__caption">{caption}</p>
      </header>
      {children}
    </section>
  );
}

function ProjectCard({ project, compact = false, variant = 'featured' }) {
  const isCurrent = variant === 'current';

  return (
    <article
      id={project.id ? `project-${project.id}` : undefined}
      className={`project-card tilt-card ${compact ? 'project-card--compact' : 'project-card--featured'} ${
        isCurrent ? 'project-card--current' : 'project-card--featured-lane'
      }`}
      {...tiltCardProps}
    >
      <div className="project-card__meta">
        <div className="project-card__meta-copy">
          <span className="micro-label">{project.category}</span>
          {isCurrent ? <span className="project-card__mode">In progress</span> : null}
        </div>
        <span className="status-pill">{project.status}</span>
      </div>
      <div className="project-card__media">
        <img src={project.image} alt={`${project.title} project preview`} />
      </div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <div className="chip-row">
        {project.tools.map((tool) => (
          <span key={tool} className="chip">
            {tool}
          </span>
        ))}
      </div>
      {isCurrent ? (
        <div className="project-card__activity" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      ) : null}
      <footer className="project-card__footer">
        <span>{project.process.join(' / ')}</span>
        {project.link ? (
          <a href={project.link} className="inline-link">
            Open module
          </a>
        ) : null}
      </footer>
    </article>
  );
}

function ContactLink({ contact }) {
  const external = contact.href.startsWith('http');

  return (
    <a
      className="contact-card"
      href={contact.href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      <span className="micro-label">{contact.label}</span>
      <strong>{contact.displayText}</strong>
    </a>
  );
}

function DorficBackdrop() {
  return (
    <div className="dorfic-backdrop" aria-hidden="true">
      <div className="dorfic-backdrop__base" />
      <div className="dorfic-backdrop__ribbons">
        <span className="dorfic-backdrop__ribbon dorfic-backdrop__ribbon--1" />
        <span className="dorfic-backdrop__ribbon dorfic-backdrop__ribbon--2" />
        <span className="dorfic-backdrop__ribbon dorfic-backdrop__ribbon--3" />
        <span className="dorfic-backdrop__ribbon dorfic-backdrop__ribbon--4" />
      </div>
      <div className="dorfic-backdrop__orbs">
        <span className="dorfic-backdrop__orb dorfic-backdrop__orb--1" />
        <span className="dorfic-backdrop__orb dorfic-backdrop__orb--2" />
        <span className="dorfic-backdrop__orb dorfic-backdrop__orb--3" />
        <span className="dorfic-backdrop__orb dorfic-backdrop__orb--4" />
      </div>
      <div className="dorfic-backdrop__rings">
        <span className="dorfic-backdrop__ring dorfic-backdrop__ring--1" />
        <span className="dorfic-backdrop__ring dorfic-backdrop__ring--2" />
        <span className="dorfic-backdrop__ring dorfic-backdrop__ring--3" />
      </div>
      <div className="dorfic-backdrop__atmosphere">
        <span className="dorfic-backdrop__bloom dorfic-backdrop__bloom--1" />
        <span className="dorfic-backdrop__bloom dorfic-backdrop__bloom--2" />
        <span className="dorfic-backdrop__grain" />
      </div>
    </div>
  );
}

function App() {
  const [appReady, setAppReady] = useState(false);
  const [activeSection, setActiveSection] = useState(navigation[0].id);
  const [headerCondensed, setHeaderCondensed] = useState(false);
  const [revealedBlocks, setRevealedBlocks] = useState({});
  const [selectedModelId, setSelectedModelId] = useState(models[0]?.id ?? null);
  const [viewerEnabled, setViewerEnabled] = useState(false);
  const collageRef = useRef(null);
  const collageCardRefs = useRef([]);
  const collageFrameRef = useRef(0);
  const revealRegistryRef = useRef(new Map());
  const collageMotionStateRef = useRef({
    pointerTargetX: 0,
    pointerTargetY: 0,
    pointerCurrentX: 0,
    pointerCurrentY: 0,
    pointerInside: false,
    pointerClientX: 0,
    pointerClientY: 0,
    emphasisValues: COLLAGE_MOTION_PROFILES.map(() => 0),
  });
  const collageMotionEnabledRef = useRef(false);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
  const supportProjects = projects.filter((project) => !project.featured);
  const selectedModel = models.find((model) => model.id === selectedModelId) ?? models[0] ?? null;
  const readyClass = appReady ? 'is-ready' : '';
  const currentWorkLabel = `${supportProjects.length} active`;

  const registerReveal = (id) => (element) => {
    if (!id) {
      return;
    }

    if (element) {
      revealRegistryRef.current.set(id, element);
    } else {
      revealRegistryRef.current.delete(id);
    }
  };

  const isBlockRevealed = (id) => Boolean(revealedBlocks[id]);

  const navigateToCollageTarget = (item) => {
    if (!item?.targetType || !item?.targetId) {
      return;
    }

    if (item.targetType === 'model') {
      setSelectedModelId(item.targetId);
      setViewerEnabled(true);

      requestAnimationFrame(() => {
        const target =
          document.getElementById(`model-${item.targetId}`) ?? document.getElementById('models');

        target?.scrollIntoView({
          behavior: 'smooth',
          block: target?.id === 'models' ? 'start' : 'center',
        });

        if (window.history?.replaceState) {
          window.history.replaceState(null, '', `#${target?.id ?? 'models'}`);
        }
      });

      return;
    }

    const prefix = item.targetType === 'print' ? 'print' : 'project';
    const target = document.getElementById(`${prefix}-${item.targetId}`);

    target?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    if (target && window.history?.replaceState) {
      window.history.replaceState(null, '', `#${target.id}`);
    }
  };

  const neutralizeCollageMotion = () => {
    const collage = collageRef.current;
    const motionState = collageMotionStateRef.current;

    motionState.pointerTargetX = 0;
    motionState.pointerTargetY = 0;
    motionState.pointerCurrentX = 0;
    motionState.pointerCurrentY = 0;
    motionState.pointerInside = false;
    motionState.emphasisValues = COLLAGE_MOTION_PROFILES.map(() => 0);

    if (collage) {
      collage.style.setProperty('--collage-scene-shift-x', '0px');
      collage.style.setProperty('--collage-scene-shift-y', '0px');
      collage.style.setProperty('--collage-scene-tilt-x', '0deg');
      collage.style.setProperty('--collage-scene-tilt-y', '0deg');
      collage.style.setProperty('--collage-scene-glow-x', '68%');
      collage.style.setProperty('--collage-scene-glow-y', '26%');
    }

    collageCardRefs.current.forEach((card) => {
      if (!card) {
        return;
      }

      card.style.setProperty('--collage-card-idle-x', '0px');
      card.style.setProperty('--collage-card-idle-y', '0px');
      card.style.setProperty('--collage-card-pointer-x', '0px');
      card.style.setProperty('--collage-card-pointer-y', '0px');
      card.style.setProperty('--collage-card-rotate-x', '0deg');
      card.style.setProperty('--collage-card-rotate-y', '0deg');
      card.style.setProperty('--collage-card-rotate-z', '0deg');
      card.style.setProperty('--collage-card-depth-float', '0px');
      card.style.setProperty('--collage-card-emphasis', '0');
      card.style.setProperty('--collage-card-glare-x', '50%');
      card.style.setProperty('--collage-card-glare-y', '24%');
    });
  };

  const applyCollageMotion = () => {
    const collage = collageRef.current;
    const cards = collageCardRefs.current.filter(Boolean);
    const motionState = collageMotionStateRef.current;

    if (!collage || !cards.length) {
      return;
    }

    const seconds = performance.now() * 0.001;

    if (!motionState.pointerInside) {
      motionState.pointerTargetX *= 0.986;
      motionState.pointerTargetY *= 0.986;
    }

    motionState.pointerCurrentX += (motionState.pointerTargetX - motionState.pointerCurrentX) * 0.12;
    motionState.pointerCurrentY += (motionState.pointerTargetY - motionState.pointerCurrentY) * 0.12;

    const sceneIdleX = Math.sin(seconds * 0.22) * 4 + Math.cos(seconds * 0.11 + 0.7) * 3;
    const sceneIdleY = Math.cos(seconds * 0.18 + 1.3) * 3 + Math.sin(seconds * 0.09 + 0.4) * 2;
    const sceneShiftX = sceneIdleX + motionState.pointerCurrentX * 14;
    const sceneShiftY = sceneIdleY + motionState.pointerCurrentY * 11;

    collage.style.setProperty('--collage-scene-shift-x', `${sceneShiftX.toFixed(2)}px`);
    collage.style.setProperty('--collage-scene-shift-y', `${sceneShiftY.toFixed(2)}px`);
    collage.style.setProperty('--collage-scene-tilt-x', `${(-motionState.pointerCurrentY * 1.05).toFixed(2)}deg`);
    collage.style.setProperty('--collage-scene-tilt-y', `${(motionState.pointerCurrentX * 1.3).toFixed(2)}deg`);
    collage.style.setProperty(
      '--collage-scene-glow-x',
      `${(66 + motionState.pointerCurrentX * 18 + sceneIdleX * 0.8).toFixed(2)}%`,
    );
    collage.style.setProperty(
      '--collage-scene-glow-y',
      `${(28 + motionState.pointerCurrentY * 16 + sceneIdleY * 0.9).toFixed(2)}%`,
    );

    let nearestIndex = -1;
    let nearestDistance = Number.POSITIVE_INFINITY;

    if (motionState.pointerInside) {
      cards.forEach((card, index) => {
        const cardBounds = card.getBoundingClientRect();
        const centerX = cardBounds.left + cardBounds.width / 2;
        const centerY = cardBounds.top + cardBounds.height / 2;
        const distance = Math.hypot(motionState.pointerClientX - centerX, motionState.pointerClientY - centerY);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });
    }

    cards.forEach((card, index) => {
      const profile = COLLAGE_MOTION_PROFILES[index] ?? COLLAGE_MOTION_PROFILES[COLLAGE_MOTION_PROFILES.length - 1];
      const emphasisTarget = nearestIndex === index ? 1 : 0;
      const idleX =
        Math.sin(seconds * profile.speedX + profile.phaseX) * profile.driftX * 0.68 +
        Math.cos(seconds * (profile.speedX * 0.58) + profile.phaseY) * profile.driftX * 0.32;
      const idleY =
        Math.cos(seconds * profile.speedY + profile.phaseY) * profile.driftY * 0.7 +
        Math.sin(seconds * (profile.speedY * 0.54) + profile.phaseZ) * profile.driftY * 0.3;
      const idleRotateZ =
        Math.sin(seconds * profile.speedZ + profile.phaseZ) * profile.rotateZ * 0.75 +
        Math.cos(seconds * (profile.speedZ * 0.62) + profile.phaseX) * profile.rotateZ * 0.25;
      const idleDepth =
        Math.sin(seconds * (profile.speedY * 0.72) + profile.phaseX) * profile.driftDepth * 0.7 +
        Math.cos(seconds * (profile.speedX * 0.44) + profile.phaseZ) * profile.driftDepth * 0.3;

      motionState.emphasisValues[index] += (emphasisTarget - motionState.emphasisValues[index]) * 0.12;

      const emphasis = motionState.emphasisValues[index];
      const pointerX = motionState.pointerCurrentX * profile.pointerX;
      const pointerY = motionState.pointerCurrentY * profile.pointerY;
      const glareX = 50 + motionState.pointerCurrentX * 24 + idleX * 0.28;
      const glareY = 24 + motionState.pointerCurrentY * 20 + idleY * 0.24;

      card.style.setProperty('--collage-card-idle-x', `${idleX.toFixed(2)}px`);
      card.style.setProperty('--collage-card-idle-y', `${idleY.toFixed(2)}px`);
      card.style.setProperty('--collage-card-pointer-x', `${pointerX.toFixed(2)}px`);
      card.style.setProperty('--collage-card-pointer-y', `${pointerY.toFixed(2)}px`);
      card.style.setProperty(
        '--collage-card-rotate-x',
        `${(-motionState.pointerCurrentY * profile.rotateX + idleY * 0.02).toFixed(2)}deg`,
      );
      card.style.setProperty(
        '--collage-card-rotate-y',
        `${(motionState.pointerCurrentX * profile.rotateY + idleX * 0.018).toFixed(2)}deg`,
      );
      card.style.setProperty('--collage-card-rotate-z', `${idleRotateZ.toFixed(2)}deg`);
      card.style.setProperty('--collage-card-depth-float', `${(idleDepth + emphasis * 8).toFixed(2)}px`);
      card.style.setProperty('--collage-card-emphasis', emphasis.toFixed(3));
      card.style.setProperty('--collage-card-glare-x', `${clamp(glareX, 12, 88).toFixed(2)}%`);
      card.style.setProperty('--collage-card-glare-y', `${clamp(glareY, 12, 84).toFixed(2)}%`);
    });
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setAppReady(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const revealId = entry.target.getAttribute('data-reveal-id');

          if (!revealId) {
            return;
          }

          setRevealedBlocks((current) => {
            if (current[revealId]) {
              return current;
            }

            return {
              ...current,
              [revealId]: true,
            };
          });

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    revealRegistryRef.current.forEach((element, revealId) => {
      if (!revealedBlocks[revealId]) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [revealedBlocks]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const stepCollageMotion = () => {
      if (!collageMotionEnabledRef.current) {
        collageFrameRef.current = 0;
        return;
      }

      applyCollageMotion();
      collageFrameRef.current = requestAnimationFrame(stepCollageMotion);
    };

    const syncCollageMotionPreference = () => {
      collageMotionEnabledRef.current = finePointerQuery.matches && !reducedMotionQuery.matches;

      if (collageMotionEnabledRef.current) {
        if (!collageFrameRef.current) {
          collageFrameRef.current = requestAnimationFrame(stepCollageMotion);
        }
      } else {
        cancelAnimationFrame(collageFrameRef.current);
        collageFrameRef.current = 0;
        neutralizeCollageMotion();
      }
    };

    const addChangeListener = (query, listener) => {
      if (query.addEventListener) {
        query.addEventListener('change', listener);
        return;
      }

      query.addListener(listener);
    };

    const removeChangeListener = (query, listener) => {
      if (query.removeEventListener) {
        query.removeEventListener('change', listener);
        return;
      }

      query.removeListener(listener);
    };

    syncCollageMotionPreference();
    addChangeListener(finePointerQuery, syncCollageMotionPreference);
    addChangeListener(reducedMotionQuery, syncCollageMotionPreference);

    return () => {
      cancelAnimationFrame(collageFrameRef.current);
      collageFrameRef.current = 0;
      neutralizeCollageMotion();
      removeChangeListener(finePointerQuery, syncCollageMotionPreference);
      removeChangeListener(reducedMotionQuery, syncCollageMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return undefined;
    }

    const root = document.documentElement;
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let currentScrollY = 0;
    let targetScrollY = 0;

    const resetBackdropMotionVars = () => {
      root.style.setProperty('--dorfic-scroll-progress', '0');
      root.style.setProperty('--dorfic-scroll-ribbons-x', '0px');
      root.style.setProperty('--dorfic-scroll-ribbons-y', '0px');
      root.style.setProperty('--dorfic-scroll-rings-x', '0px');
      root.style.setProperty('--dorfic-scroll-rings-y', '0px');
      root.style.setProperty('--dorfic-scroll-orbs-y', '0px');
      root.style.setProperty('--dorfic-scroll-atmosphere-y', '0px');
      root.style.setProperty('--dorfic-scroll-sweep-rotate', '0deg');
    };

    const setBackdropMotionVars = (scrollY) => {
      const scrollableHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = clamp(scrollY / scrollableHeight, 0, 1);
      const sweepBias = (progress - 0.5) * 2;

      root.style.setProperty('--dorfic-scroll-progress', progress.toFixed(4));
      root.style.setProperty('--dorfic-scroll-ribbons-x', `${(sweepBias * 20).toFixed(2)}px`);
      root.style.setProperty('--dorfic-scroll-ribbons-y', `${(-scrollY * 0.035).toFixed(2)}px`);
      root.style.setProperty('--dorfic-scroll-rings-x', `${(-sweepBias * 14).toFixed(2)}px`);
      root.style.setProperty('--dorfic-scroll-rings-y', `${(scrollY * 0.014).toFixed(2)}px`);
      root.style.setProperty('--dorfic-scroll-orbs-y', `${(scrollY * 0.022).toFixed(2)}px`);
      root.style.setProperty('--dorfic-scroll-atmosphere-y', `${(-scrollY * 0.026).toFixed(2)}px`);
      root.style.setProperty('--dorfic-scroll-sweep-rotate', `${(sweepBias * 2.2).toFixed(2)}deg`);
    };

    const stepBackdropMotion = () => {
      frame = 0;
      currentScrollY += (targetScrollY - currentScrollY) * 0.14;

      if (Math.abs(targetScrollY - currentScrollY) < 0.3) {
        currentScrollY = targetScrollY;
      }

      setBackdropMotionVars(currentScrollY);

      if (Math.abs(targetScrollY - currentScrollY) >= 0.3) {
        frame = requestAnimationFrame(stepBackdropMotion);
      }
    };

    const requestBackdropMotionUpdate = () => {
      if (reducedMotionQuery.matches) {
        cancelAnimationFrame(frame);
        frame = 0;
        currentScrollY = 0;
        targetScrollY = 0;
        resetBackdropMotionVars();
        return;
      }

      targetScrollY = window.scrollY || window.pageYOffset || 0;

      if (!frame) {
        frame = requestAnimationFrame(stepBackdropMotion);
      }
    };

    const syncBackdropMotionPreference = () => {
      if (reducedMotionQuery.matches) {
        cancelAnimationFrame(frame);
        frame = 0;
        currentScrollY = 0;
        targetScrollY = 0;
        resetBackdropMotionVars();
        return;
      }

      currentScrollY = window.scrollY || window.pageYOffset || 0;
      targetScrollY = currentScrollY;
      setBackdropMotionVars(currentScrollY);
    };

    const addChangeListener = (query, listener) => {
      if (query.addEventListener) {
        query.addEventListener('change', listener);
        return;
      }

      query.addListener(listener);
    };

    const removeChangeListener = (query, listener) => {
      if (query.removeEventListener) {
        query.removeEventListener('change', listener);
        return;
      }

      query.removeListener(listener);
    };

    syncBackdropMotionPreference();
    window.addEventListener('scroll', requestBackdropMotionUpdate, { passive: true });
    window.addEventListener('resize', requestBackdropMotionUpdate);
    addChangeListener(reducedMotionQuery, syncBackdropMotionPreference);

    return () => {
      cancelAnimationFrame(frame);
      resetBackdropMotionVars();
      window.removeEventListener('scroll', requestBackdropMotionUpdate);
      window.removeEventListener('resize', requestBackdropMotionUpdate);
      removeChangeListener(reducedMotionQuery, syncBackdropMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    let frame = 0;

    const updateHeaderCondensed = () => {
      frame = 0;
      const nextValue = (window.scrollY || window.pageYOffset || 0) > 24;

      setHeaderCondensed((previous) => (previous === nextValue ? previous : nextValue));
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = requestAnimationFrame(updateHeaderCondensed);
      }
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  useEffect(() => {
    let frame = 0;

    const getSections = () =>
      navigation
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

    const updateActiveSection = () => {
      const sectionElements = getSections();

      if (!sectionElements.length) {
        return;
      }

      const probeLine = window.scrollY + window.innerHeight * 0.3;
      let currentId = sectionElements[0].id;

      sectionElements.forEach((section) => {
        if (section.offsetTop <= probeLine) {
          currentId = section.id;
        }
      });

      const pageBottom = window.innerHeight + window.scrollY;
      const documentBottom = document.documentElement.scrollHeight - 4;

      if (pageBottom >= documentBottom) {
        currentId = sectionElements[sectionElements.length - 1].id;
      }

      setActiveSection((previous) => (previous === currentId ? previous : currentId));
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveSection);
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  useEffect(() => {
    const modelSection = document.getElementById('models');

    if (!modelSection) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setViewerEnabled(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '320px 0px',
      },
    );

    observer.observe(modelSection);

    return () => observer.disconnect();
  }, []);

  const handleCollagePointerMove = (event) => {
    const collage = collageRef.current;
    const motionState = collageMotionStateRef.current;

    if (!collageMotionEnabledRef.current || event.pointerType !== 'mouse' || !collage) {
      return;
    }

    const collageBounds = collage.getBoundingClientRect();

    motionState.pointerInside = true;
    motionState.pointerClientX = event.clientX;
    motionState.pointerClientY = event.clientY;
    motionState.pointerTargetX = clamp(((event.clientX - collageBounds.left) / collageBounds.width - 0.5) * 2, -1, 1);
    motionState.pointerTargetY = clamp(((event.clientY - collageBounds.top) / collageBounds.height - 0.5) * 2, -1, 1);
  };

  const handleCollagePointerLeave = () => {
    collageMotionStateRef.current.pointerInside = false;
  };

  return (
    <div className="app-root">
      <DorficBackdrop />
      <div className="app-shell">
        <header className="site-header">
          <div
            className={`site-header__utility reveal-seq ${readyClass} ${headerCondensed ? 'is-condensed' : ''}`}
            style={{ '--reveal-delay': '0.08s' }}
          >
            <div className="site-header__brand">
              <p className="micro-label site-header__eyebrow">Portfolio module</p>
              <div className="site-header__identity">
                <h1 className="site-header__name">{siteMeta.title}</h1>
                <p className="site-header__role">{siteMeta.role}</p>
              </div>
            </div>
            <div className="site-header__actions">
              <p className="site-header__support" aria-label={`${siteMeta.location}. ${siteMeta.availability}`}>
                <span>{siteMeta.location}</span>
                <span>{siteMeta.availability}</span>
              </p>
              <a href="#contact" className="bevel-button site-header__cta">
                Contact
              </a>
            </div>
          </div>
        </header>

        <div className="site-layout">
          <aside className="site-sidebar">
            <div
              className={`site-sidebar__panel reveal-seq ${readyClass}`}
              style={{ '--reveal-delay': '0.2s' }}
            >
              <p className="micro-label">Section index</p>
              <nav className="section-nav section-nav--sidebar" aria-label="Primary">
                {navigation.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`section-nav__link section-nav__link--sidebar ${activeSection === item.id ? 'is-active' : ''}`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    <span className="section-nav__text">{item.label}</span>
                    <span className="section-nav__meter" aria-hidden="true" />
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <main className="site-main">
          <section id="intro" className="hero-panel">
          <div
            className={`hero-panel__intro reveal-seq ${readyClass}`}
            style={{ '--reveal-delay': '0.32s' }}
          >
            <p className="micro-label">Landing page / Intro</p>
            <h2>{hero.name}</h2>
            <p className="hero-role">{hero.role}</p>
            <p className="hero-tagline">{hero.tagline}</p>
            <p className="hero-copy">{hero.intro}</p>
            <div className="hero-actions">
              <a href="#projects" className="bevel-button">
                View projects
              </a>
              <a href="#contact" className="bevel-button bevel-button--muted">
                Contact
              </a>
            </div>
          </div>

          <div
            className={`hero-panel__collage-shell reveal-seq ${readyClass}`}
            style={{ '--reveal-delay': '0.42s' }}
          >
            <div
              ref={collageRef}
              className="hero-panel__collage"
              aria-label="Project collage"
              onPointerMove={handleCollagePointerMove}
              onPointerLeave={handleCollagePointerLeave}
            >
              <span className="hero-panel__collage-sheen" aria-hidden="true" />
              {hero.collageItems.map((item, index) => (
                <button
                  key={item.caption}
                  type="button"
                  ref={(element) => {
                    collageCardRefs.current[index] = element;
                  }}
                  className={`collage-card collage-card--${index + 1}`}
                  data-collage-card
                  aria-label={`Open ${item.caption}`}
                  onClick={() => navigateToCollageTarget(item)}
                  style={{
                    '--collage-card-depth-z': `${(COLLAGE_MOTION_PROFILES[index]?.depthZ ?? 10).toFixed(0)}px`,
                  }}
                >
                  <div className="collage-card__body">
                    <img src={item.image} alt={item.caption} />
                    <div className="collage-card__caption">
                      <span className="micro-label">{item.label}</span>
                      <strong>{item.caption}</strong>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="hero-panel__stats">
            {hero.highlights.map((item, index) => (
              <article
                key={item.label}
                className={`signal-card reveal-seq ${readyClass}`}
                style={{ '--reveal-delay': `${0.52 + index * 0.08}s` }}
              >
                <span className="micro-label">{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
        </section>

        <SectionFrame
          id="projects"
          title="Projects"
          meta="Selected work"
          caption="Featured fabrication-led projects on the left, with a separate current-work rail for active in-progress modules on the right."
          className="section-frame--projects"
          revealId="projects-frame"
          revealDelay="0s"
          isRevealed={isBlockRevealed('projects-frame')}
          registerReveal={registerReveal}
        >
          <div className="projects-layout">
            <div className="projects-layout__featured">
              <header
                ref={registerReveal('projects-featured-header')}
                data-reveal-id="projects-featured-header"
                className={`lane-header lane-header--featured reveal-on-scroll ${
                  isBlockRevealed('projects-featured-header') ? 'is-revealed' : ''
                }`}
                style={{ '--reveal-delay': '0.02s' }}
              >
                <div>
                  <p className="micro-label">Featured projects</p>
                  <h3>Primary showcase</h3>
                </div>
                <span className="lane-header__count">{featuredProjects.length} modules</span>
              </header>
              {featuredProjects.map((project, index) => (
                <div
                  key={project.title}
                  ref={registerReveal(`project-slot-${index + 1}`)}
                  data-reveal-id={`project-slot-${index + 1}`}
                  className={`projects-layout__slot projects-layout__slot--${index + 1} reveal-on-scroll ${
                    isBlockRevealed(`project-slot-${index + 1}`) ? 'is-revealed' : ''
                  }`}
                  style={{ '--reveal-delay': `${0.04 + index * 0.06}s` }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>

            <aside
              ref={registerReveal('projects-current-rail')}
              data-reveal-id="projects-current-rail"
              className={`projects-layout__support current-rail reveal-on-scroll ${
                isBlockRevealed('projects-current-rail') ? 'is-revealed' : ''
              }`}
              style={{ '--reveal-delay': '0.08s' }}
            >
              <header className="lane-header lane-header--current">
                <div>
                  <p className="micro-label">Current work</p>
                  <h3>Active build rail</h3>
                </div>
                <span className="lane-header__count">{currentWorkLabel}</span>
              </header>

              <div className="current-rail__summary">
                <p className="micro-label">Current emphasis</p>
                <h3>Physical product / 3D / fabrication work</h3>
                <p>
                  The current body of work centers on making objects, support systems, and testable
                  components that move quickly from concept to printed proof.
                </p>
              </div>

              <div className="current-rail__divider" aria-hidden="true" />

              <div className="current-rail__list">
                {supportProjects.map((project, index) => (
                  <div
                    key={project.title}
                    ref={registerReveal(`support-project-${index + 1}`)}
                    data-reveal-id={`support-project-${index + 1}`}
                    className={`support-project-slot reveal-on-scroll ${
                      isBlockRevealed(`support-project-${index + 1}`) ? 'is-revealed' : ''
                    }`}
                    style={{ '--reveal-delay': `${0.14 + index * 0.06}s` }}
                  >
                    <ProjectCard project={project} compact variant="current" />
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </SectionFrame>

        <SectionFrame
          id="models"
          title="3D Models"
          meta="Catalog browser"
          caption="A browseable product-style library with interactive preview and direct model downloads."
          className="section-frame--models"
          revealId="models-frame"
          revealDelay="0s"
          isRevealed={isBlockRevealed('models-frame')}
          registerReveal={registerReveal}
        >
          <div className="models-layout">
            <div
              ref={registerReveal('models-viewer')}
              data-reveal-id="models-viewer"
              className={`viewer-panel reveal-on-scroll ${isBlockRevealed('models-viewer') ? 'is-revealed' : ''}`}
              style={{ '--reveal-delay': '0.06s' }}
            >
              <div className="viewer-panel__toolbar">
                <div>
                  <p className="micro-label">Selected model</p>
                  <h3>{selectedModel?.title ?? 'No model selected'}</h3>
                </div>
                <div className="viewer-panel__specs">
                  <span>{selectedModel?.specLabel ?? 'No file attached'}</span>
                  {selectedModel?.downloadUrl ? (
                    <a href={selectedModel.downloadUrl} className="inline-link">
                      Download
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="viewer-panel__stage">
                {viewerEnabled ? (
                  <Suspense
                    fallback={
                      <div className="viewer-empty">
                        <p>Loading viewer...</p>
                      </div>
                    }
                  >
                    <ModelViewer model={selectedModel} autoRotate />
                  </Suspense>
                ) : (
                  <div className="viewer-empty">
                    {selectedModel?.thumbnail ? (
                      <img
                        src={selectedModel.thumbnail}
                        alt={`${selectedModel.title} preview`}
                        className="viewer-empty__poster"
                      />
                    ) : null}
                    <p>Scroll to this module to activate the interactive preview.</p>
                  </div>
                )}
              </div>

              <div className="viewer-panel__caption">
                <p>{selectedModel?.description}</p>
              </div>
            </div>

            <div
              ref={registerReveal('models-catalog')}
              data-reveal-id="models-catalog"
              className={`catalog-panel reveal-on-scroll ${isBlockRevealed('models-catalog') ? 'is-revealed' : ''}`}
              style={{ '--reveal-delay': '0.12s' }}
            >
              <header className="catalog-panel__header">
                <p className="micro-label">Library</p>
                <span>{models.length} models loaded</span>
              </header>

              <div className="catalog-panel__list" role="list">
                {models.map((model) => (
                  <button
                    key={model.id}
                    id={`model-${model.id}`}
                    type="button"
                    className={`catalog-card tilt-card ${selectedModelId === model.id ? 'is-selected' : ''}`}
                    onClick={() => setSelectedModelId(model.id)}
                    {...tiltCardProps}
                  >
                    <img src={model.thumbnail} alt="" />
                    <div className="catalog-card__body">
                      <span className="micro-label">{model.specLabel}</span>
                      <strong>{model.title}</strong>
                      <p>{model.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SectionFrame>

        <SectionFrame
          id="prints"
          title="3D Prints"
          meta="Output gallery"
          caption="Printed parts shown as compact modules with material notes and short production captions."
          revealId="prints-frame"
          revealDelay="0s"
          isRevealed={isBlockRevealed('prints-frame')}
          registerReveal={registerReveal}
        >
          <div className="prints-grid">
            {prints.map((print, index) => (
              <div
                key={print.title}
                ref={registerReveal(`print-slot-${index + 1}`)}
                data-reveal-id={`print-slot-${index + 1}`}
                className={`prints-grid__slot reveal-on-scroll ${
                  isBlockRevealed(`print-slot-${index + 1}`) ? 'is-revealed' : ''
                }`}
                style={{ '--reveal-delay': `${0.04 + index * 0.05}s` }}
              >
                <article
                  id={print.id ? `print-${print.id}` : undefined}
                  className="print-card tilt-card"
                  {...tiltCardProps}
                >
                  <div className="print-card__media">
                    <img src={print.image} alt={`${print.title} print preview`} />
                  </div>
                  <div className="print-card__body">
                    <div className="print-card__meta">
                      <span className="micro-label">{print.specLabel}</span>
                      <span className="status-pill">{print.material}</span>
                    </div>
                    <h3>{print.title}</h3>
                    <p>{print.description}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </SectionFrame>

        <SectionFrame
          id="about"
          title="About"
          meta="Personal profile"
          caption="A narrative look at how I approach making, testing, and turning ideas into working systems."
          className="section-frame--about"
          revealId="about-frame"
          revealDelay="0s"
          isRevealed={isBlockRevealed('about-frame')}
          registerReveal={registerReveal}
        >
          <div className="about-layout">
            <article
              ref={registerReveal('about-story')}
              data-reveal-id="about-story"
              className={`support-panel support-panel--about reveal-on-scroll ${
                isBlockRevealed('about-story') ? 'is-revealed' : ''
              }`}
              style={{ '--reveal-delay': '0.04s' }}
            >
              <p className="micro-label">Narrative</p>
              <h3>Building work that gets sharper once it can be used, tested, and revised.</h3>
              <div className="about-copy">
                {aboutMe.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>

            <article
              ref={registerReveal('about-highlights')}
              data-reveal-id="about-highlights"
              className={`resume-panel resume-panel--about reveal-on-scroll ${
                isBlockRevealed('about-highlights') ? 'is-revealed' : ''
              }`}
              style={{ '--reveal-delay': '0.1s' }}
            >
              <p className="micro-label">At a glance</p>
              <div className="about-highlights">
                {aboutMe.highlights.map((item) => (
                  <div key={item.label} className="about-highlight">
                    <span>{item.label}</span>
                    <p>{item.value}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </SectionFrame>

        <SectionFrame
          id="resume"
          title="Resume"
          meta="Technical dossier"
          caption="Experience, skills, and education arranged as dense but readable information modules."
          revealId="resume-frame"
          revealDelay="0s"
          isRevealed={isBlockRevealed('resume-frame')}
          registerReveal={registerReveal}
        >
          <div className="resume-layout">
            <article
              ref={registerReveal('resume-experience')}
              data-reveal-id="resume-experience"
              className={`resume-panel resume-panel--experience reveal-on-scroll ${
                isBlockRevealed('resume-experience') ? 'is-revealed' : ''
              }`}
              style={{ '--reveal-delay': '0.08s' }}
            >
              <p className="micro-label">Experience</p>
              <div className="resume-stack">
                {resume.experience.map((item) => (
                  <div key={item.title} className="resume-entry">
                    <span>{item.period}</span>
                    <h3>{item.title}</h3>
                    <strong>{item.organization}</strong>
                    <p>{item.summary}</p>
                  </div>
                ))}
              </div>
            </article>

            <article
              ref={registerReveal('resume-skills')}
              data-reveal-id="resume-skills"
              className={`resume-panel reveal-on-scroll ${isBlockRevealed('resume-skills') ? 'is-revealed' : ''}`}
              style={{ '--reveal-delay': '0.12s' }}
            >
              <p className="micro-label">Skills</p>
              <div className="skills-grid">
                {resume.skills.map((group) => (
                  <div key={group.label} className="skill-group">
                    <h3>{group.label}</h3>
                    <div className="chip-row">
                      {group.items.map((item) => (
                        <span key={item} className="chip">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article
              ref={registerReveal('resume-education')}
              data-reveal-id="resume-education"
              className={`resume-panel reveal-on-scroll ${isBlockRevealed('resume-education') ? 'is-revealed' : ''}`}
              style={{ '--reveal-delay': '0.16s' }}
            >
              <p className="micro-label">Education</p>
              <div className="resume-stack resume-stack--compact">
                {resume.education.map((item) => (
                  <div key={item.label} className="resume-entry">
                    <span>{item.label}</span>
                    <p>{item.value}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </SectionFrame>

        <SectionFrame
          id="contact"
          title="Contact"
          meta="Utility links"
          caption="Replace the placeholder handles below with your live email and profile URLs when you are ready."
          className="section-frame--contact"
          revealId="contact-frame"
          revealDelay="0s"
          isRevealed={isBlockRevealed('contact-frame')}
          registerReveal={registerReveal}
        >
          <div className="contact-layout">
            <div
              ref={registerReveal('contact-panel')}
              data-reveal-id="contact-panel"
              className={`support-panel support-panel--contact reveal-on-scroll ${
                isBlockRevealed('contact-panel') ? 'is-revealed' : ''
              }`}
              style={{ '--reveal-delay': '0.04s' }}
            >
              <p className="micro-label">Reach out</p>
              <h3>Available for prototype builds, interface experiments, and collaborative research.</h3>
              <p>
                This starter version is wired to obvious placeholder links so you can drop your real contact
                details into a single data file later.
              </p>
            </div>
            <div className="contact-grid">
              {contacts.map((contact, index) => (
                <div
                  key={contact.label}
                  ref={registerReveal(`contact-card-${index + 1}`)}
                  data-reveal-id={`contact-card-${index + 1}`}
                  className={`reveal-on-scroll ${isBlockRevealed(`contact-card-${index + 1}`) ? 'is-revealed' : ''}`}
                  style={{ '--reveal-delay': `${0.08 + index * 0.05}s` }}
                >
                  <ContactLink contact={contact} />
                </div>
              ))}
            </div>
          </div>
        </SectionFrame>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
