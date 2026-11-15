
document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. INTERESTS AND LEARNING
  // ==========================================

  const defaultInterests = {
    photography: 3,
    cooking: 2,
    fitness: 1,
    travel: 2
  };

  const interests = { ...defaultInterests };

  const topicIcons = {
    photography: "📸",
    cooking: "🍳",
    fitness: "💪",
    travel: "✈️"
  };

  // Two different liked posts in one category
  // increase that category's interest score by one.
  const LIKE_THRESHOLD = 2;

  let learningEnabled = true;
  let lastAdjustedTopic = "photography";
  let feedVersion = 0;
  let feedbackTimeout;

  const likedPostIds = new Set();

  const countedLikes = Object.fromEntries(
    Object.keys(interests).map(topic => [
      topic,
      new Set()
    ])
  );


  // ==========================================
  // 2. CONTENT LIBRARY — 24 POSTS
  // ==========================================

  const contentLibrary = [

    // PHOTOGRAPHY

    {
      id: 1,
      topic: "photography",
      creator: "@landscapeexplorer",
      caption: "Beautiful landscapes around the world.",
      image: "https://picsum.photos/id/1018/900/1200"
    },
    {
      id: 2,
      topic: "photography",
      creator: "@photographytips",
      caption: "Improve your landscape photography.",
      image: "https://picsum.photos/id/1015/900/1200"
    },
    {
      id: 3,
      topic: "photography",
      creator: "@natureframes",
      caption: "Capturing the beauty of nature.",
      image: "https://picsum.photos/id/1016/900/1200"
    },
    {
      id: 4,
      topic: "photography",
      creator: "@cameraexplorer",
      caption: "Discover creative photography techniques.",
      image: "https://picsum.photos/id/1019/900/1200"
    },
    {
      id: 5,
      topic: "photography",
      creator: "@visualstories",
      caption: "Photography inspiration for beginners.",
      image: "https://picsum.photos/id/1022/900/1200"
    },
    {
      id: 6,
      topic: "photography",
      creator: "@outdoorphotos",
      caption: "Exploring the world through photography.",
      image: "https://picsum.photos/id/1039/900/1200"
    },

    // COOKING

    {
      id: 7,
      topic: "cooking",
      creator: "@easyrecipes",
      caption: "Easy pasta recipes for beginners.",
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=900"
    },
    {
      id: 8,
      topic: "cooking",
      creator: "@homechef",
      caption: "Simple meals you can make at home.",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=900"
    },
    {
      id: 9,
      topic: "cooking",
      creator: "@foodinspiration",
      caption: "Discover delicious new dishes.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900"
    },
    {
      id: 10,
      topic: "cooking",
      creator: "@quickmeals",
      caption: "Quick and easy cooking ideas.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900"
    },
    {
      id: 11,
      topic: "cooking",
      creator: "@kitchenideas",
      caption: "Creative recipes to try this week.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900"
    },
    {
      id: 12,
      topic: "cooking",
      creator: "@foodlovers",
      caption: "Explore different flavours and recipes.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900"
    },

    // FITNESS

    {
      id: 13,
      topic: "fitness",
      creator: "@fitnessdaily",
      caption: "Beginner workout routines.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900"
    },
    {
      id: 14,
      topic: "fitness",
      creator: "@workoutguide",
      caption: "Simple exercises for everyday fitness.",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900"
    },
    {
      id: 15,
      topic: "fitness",
      creator: "@activeeveryday",
      caption: "Stay active with these workout ideas.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900"
    },
    {
      id: 16,
      topic: "fitness",
      creator: "@gymmotivation",
      caption: "Build a consistent exercise routine.",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900"
    },
    {
      id: 17,
      topic: "fitness",
      creator: "@fitnessjourney",
      caption: "Discover new ways to stay active.",
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=900"
    },
    {
      id: 18,
      topic: "fitness",
      creator: "@trainingtips",
      caption: "Fitness tips for beginners.",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900"
    },

    // TRAVEL

    {
      id: 19,
      topic: "travel",
      creator: "@travelworld",
      caption: "Explore beautiful destinations in Japan.",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900"
    },
    {
      id: 20,
      topic: "travel",
      creator: "@exploremore",
      caption: "Discover amazing places around the world.",
      image: "https://picsum.photos/id/1036/900/1200"
    },
    {
      id: 21,
      topic: "travel",
      creator: "@cityexplorer",
      caption: "Explore beautiful cities and landmarks.",
      image: "https://picsum.photos/id/1043/900/1200"
    },
    {
      id: 22,
      topic: "travel",
      creator: "@adventuretime",
      caption: "Travel inspiration for your next trip.",
      image: "https://picsum.photos/id/1040/900/1200"
    },
    {
      id: 23,
      topic: "travel",
      creator: "@wanderworld",
      caption: "Beautiful destinations worth exploring.",
      image: "https://picsum.photos/id/1050/900/1200"
    },
    {
      id: 24,
      topic: "travel",
      creator: "@travelstories",
      caption: "Experience incredible places around the globe.",
      image: "https://picsum.photos/id/1056/900/1200"
    }
  ];


  // ==========================================
  // 3. HTML ELEMENTS
  // ==========================================

  const feed = document.getElementById("feed");
  const about = document.getElementById("about");
  const settings = document.getElementById("settings");

  const feedTab = document.getElementById("feed-tab");
  const aboutTab = document.getElementById("about-tab");
  const settingsTab = document.getElementById("settings-tab");

  const interestsList =
    document.getElementById("interests-list");

  const learningToggle =
    document.getElementById("learning-toggle");

  const learningStatus =
    document.getElementById("learning-status");

  const resetButton =
    document.getElementById("reset-btn");

  const resetConfirmation =
    document.getElementById("reset-confirmation");

  const confirmReset =
    document.getElementById("confirm-reset");

  const cancelReset =
    document.getElementById("cancel-reset");

  const feedbackBar =
    document.getElementById("global-feedback");


  // ==========================================
  // 4. FEEDBACK FOR EXPLICIT ACTIONS ONLY
  // ==========================================

  function hideFeedback() {

    clearTimeout(feedbackTimeout);
    feedbackBar.hidden = true;
  }

  function showFeedback(message, undoAction = null) {

    clearTimeout(feedbackTimeout);
    feedbackBar.replaceChildren();

    const label = document.createElement("span");
    label.textContent = message;

    feedbackBar.appendChild(label);

    if (undoAction) {

      const undoButton = document.createElement("button");
      undoButton.type = "button";
      undoButton.textContent = "↩ Undo";

      undoButton.addEventListener(
        "click",
        undoAction,
        { once: true }
      );

      feedbackBar.appendChild(undoButton);
    }

    feedbackBar.hidden = false;

    feedbackTimeout = setTimeout(
      hideFeedback,
      5000
    );
  }


  // ==========================================
  // 5. NAVIGATION
  // ==========================================

  function showPage(page) {

    feed.hidden = page !== "feed";
    about.hidden = page !== "about";
    settings.hidden = page !== "settings";

    feedTab.classList.toggle(
      "active",
      page === "feed"
    );

    aboutTab.classList.toggle(
      "active",
      page === "about"
    );

    settingsTab.classList.toggle(
      "active",
      page === "settings"
    );

    if (page !== "feed") {
      hideFeedback();
    }
  }

  feedTab.addEventListener("click", () => {
    showPage("feed");
  });

  aboutTab.addEventListener("click", () => {
    showPage("about");
  });

  settingsTab.addEventListener("click", () => {
    renderInterests();
    showPage("settings");
  });


  // ==========================================
  // 6. RECOMMENDATION ALGORITHM
  // ==========================================

  function calculateDistribution() {

    const topics = Object.keys(interests);

    const counts = Object.fromEntries(
      topics.map(topic => [topic, 0])
    );

    const active = topics.filter(
      topic => interests[topic] > 0
    );

    if (active.length === 0) {

      topics.forEach((topic, index) => {
        counts[topic] = index === 0 ? 2 : 1;
      });

      return {
        counts,
        discoveryTopic: null
      };
    }

    if (active.length === 1) {

      counts[active[0]] = 5;

      return {
        counts,
        discoveryTopic: null
      };
    }

    const ranked = [...active].sort((a, b) => {

      return interests[b] - interests[a] ||
        (
          a === lastAdjustedTopic ? -1 :
          b === lastAdjustedTopic ? 1 : 0
        );
    });

    const discoveryTopic =
      ranked[ranked.length - 1];

    counts[discoveryTopic] = 1;

    const mainTopics = ranked.filter(
      topic => topic !== discoveryTopic
    );

    const total = mainTopics.reduce(
      (sum, topic) => sum + interests[topic],
      0
    );

    const quotas = mainTopics.map(topic => {

      const exact =
        4 * interests[topic] / total;

      return {
        topic,
        whole: Math.floor(exact),
        fraction: exact % 1
      };
    });

    let allocated = 0;

    quotas.forEach(item => {
      counts[item.topic] = item.whole;
      allocated += item.whole;
    });

    quotas.sort((a, b) => {

      return b.fraction - a.fraction ||
        (
          a.topic === lastAdjustedTopic ? -1 :
          b.topic === lastAdjustedTopic ? 1 : 0
        );
    });

    for (let i = 0; i < 4 - allocated; i++) {
      counts[quotas[i].topic]++;
    }

    return {
      counts,
      discoveryTopic
    };
  }

  let currentDistribution =
    calculateDistribution();


  // ==========================================
  // 7. UPDATE VISIBLE DISTRIBUTION
  // ==========================================

  function updateDistribution(topic, direction) {

    const next = calculateDistribution();

    const previous = {
      ...currentDistribution.counts
    };

    const active = Object.keys(interests).filter(
      item => interests[item] > 0
    );

    if (
      active.length <= 1 ||
      interests[topic] === 0
    ) {
      currentDistribution = next;
      return;
    }

    const adjusted = { ...previous };

    if (direction > 0 && adjusted[topic] < 5) {

      const donors = active
        .filter(item =>
          item !== topic &&
          adjusted[item] > 0
        )
        .sort((a, b) =>
          interests[a] - interests[b]
        );

      if (donors.length > 0) {

        adjusted[donors[0]]--;
        adjusted[topic]++;

        currentDistribution = {
          counts: adjusted,
          discoveryTopic:
            adjusted[next.discoveryTopic] > 0
              ? next.discoveryTopic
              : null
        };

        return;
      }
    }

    if (direction < 0 && adjusted[topic] > 0) {

      const receivers = active
        .filter(item => item !== topic)
        .sort((a, b) =>
          interests[b] - interests[a]
        );

      if (receivers.length > 0) {

        adjusted[topic]--;
        adjusted[receivers[0]]++;

        currentDistribution = {
          counts: adjusted,
          discoveryTopic:
            adjusted[next.discoveryTopic] > 0
              ? next.discoveryTopic
              : null
        };

        return;
      }
    }

    currentDistribution = next;
  }


  // ==========================================
  // 8. SELECT RECOMMENDED POSTS
  // ==========================================

  function selectPosts() {

    const selected = [];

    const { counts, discoveryTopic } =
      currentDistribution;

    for (const topic of Object.keys(counts)) {

      const available = contentLibrary.filter(
        post => post.topic === topic
      );

      const start =
        feedVersion % available.length;

      for (let i = 0; i < counts[topic]; i++) {

        const post = available[
          (start + i) % available.length
        ];

        selected.push({
          ...post,
          isDiscovery:
            topic === discoveryTopic && i === 0
        });
      }
    }

    selected.sort((a, b) => {

      if (a.isDiscovery !== b.isDiscovery) {
        return a.isDiscovery ? 1 : -1;
      }

      return interests[b.topic] - interests[a.topic];
    });

    return selected;
  }


  // ==========================================
  // 9. EXPLANATIONS
  // ==========================================

  function getExplanation(post) {

    if (post.isDiscovery) {
      return "Recommended to help you discover something different.";
    }

    return `Your current ${post.topic} interest score influences this recommendation.`;
  }


  // ==========================================
  // 10. RENDER FEED
  // ==========================================

  function renderFeed() {

    feed.replaceChildren();

    selectPosts().forEach(post => {

      const article = document.createElement("article");
      article.className = "post";
      article.dataset.topic = post.topic;

      const image = document.createElement("img");
      image.className = "post-image";
      image.src = post.image;
      image.alt = post.caption;
      image.loading = "lazy";

      const content = document.createElement("div");
      content.className = "post-content";

      const creator = document.createElement("h2");
      creator.textContent = post.creator;

      const caption = document.createElement("p");
      caption.textContent = post.caption;

      const topicLabel = document.createElement("p");
      topicLabel.className = "topic";
      topicLabel.textContent = `#${post.topic}`;

      content.append(
        creator,
        caption,
        topicLabel
      );

      if (post.isDiscovery) {

        const discovery = document.createElement("span");
        discovery.className = "discovery-label";

        discovery.textContent =
          "✨ Discover something different";

        content.appendChild(discovery);
      }

      const actions = document.createElement("div");
      actions.className = "post-actions";

      function actionButton(text, className, handler) {

        const button = document.createElement("button");

        button.type = "button";
        button.className = className;
        button.textContent = text;

        button.addEventListener("click", handler);

        actions.appendChild(button);

        return button;
      }

      // WHY THIS EXPLANATION

      const explanation = document.createElement("div");
      explanation.className = "explanation";
      explanation.hidden = true;

      const explanationTitle = document.createElement("h3");
      explanationTitle.textContent =
        "✨ Why am I seeing this?";

      const explanationTopic = document.createElement("p");
      explanationTopic.className = "explanation-topic";

      explanationTopic.textContent =
        `${topicIcons[post.topic]} Interest in ${post.topic}: ${interests[post.topic]}/5`;

      const explanationText = document.createElement("p");
      explanationText.textContent =
        getExplanation(post);

      explanation.append(
        explanationTitle,
        explanationTopic,
        explanationText
      );

      // LIKE BUTTON — NO ANNOUNCEMENTS

      const liked = likedPostIds.has(post.id);

      const likeButton = actionButton(
        liked ? "❤️ Liked" : "♡ Like",
        `like-btn${liked ? " liked" : ""}`,
        () => toggleLike(post)
      );

      likeButton.setAttribute(
        "aria-pressed",
        String(liked)
      );

      // WHY THIS BUTTON

      const whyButton = actionButton(
        "Why this?",
        "why-btn",
        () => {

          explanation.hidden = !explanation.hidden;

          whyButton.textContent = explanation.hidden
            ? "Why this?"
            : "Hide explanation";
        }
      );

      // SHOW MORE AND SHOW LESS

      actionButton(
        "Show more",
        "more-btn",
        () => changePreference(post.topic, 1)
      );

      actionButton(
        "Show less",
        "less-btn",
        () => changePreference(post.topic, -1)
      );

      article.append(
        image,
        content,
        actions,
        explanation
      );

      feed.appendChild(article);
    });
  }


  // ==========================================
  // 11. SAVE STATE FOR EXPLICIT UNDO
  // ==========================================

  function snapshot() {

    return {

      interests: { ...interests },

      distribution: {
        counts: { ...currentDistribution.counts },
        discoveryTopic:
          currentDistribution.discoveryTopic
      },

      lastAdjustedTopic,
      feedVersion,

      liked: new Set(likedPostIds),

      counted: Object.fromEntries(
        Object.keys(countedLikes).map(topic => [
          topic,
          new Set(countedLikes[topic])
        ])
      )
    };
  }


  // ==========================================
  // 12. RESTORE PREVIOUS STATE
  // ==========================================

  function restore(previous) {

    Object.assign(
      interests,
      previous.interests
    );

    currentDistribution = {
      counts: {
        ...previous.distribution.counts
      },
      discoveryTopic:
        previous.distribution.discoveryTopic
    };

    lastAdjustedTopic =
      previous.lastAdjustedTopic;

    feedVersion = previous.feedVersion;

    likedPostIds.clear();

    previous.liked.forEach(id => {
      likedPostIds.add(id);
    });

    Object.keys(countedLikes).forEach(topic => {

      countedLikes[topic].clear();

      previous.counted[topic].forEach(id => {
        countedLikes[topic].add(id);
      });
    });

    renderFeed();
    renderInterests();
  }


  // ==========================================
  // 13. SILENT LEARNING FROM LIKES
  // ==========================================

  function toggleLike(post) {

    const topic = post.topic;

    // UNLIKE:
    // Remove the like without any notification.

    if (likedPostIds.has(post.id)) {

      likedPostIds.delete(post.id);
      countedLikes[topic].delete(post.id);

      renderFeed();
      return;
    }

    // LIKE:
    // Change the heart without any notification.

    likedPostIds.add(post.id);

    // If learning is paused, save the like
    // without changing interest scores.

    if (!learningEnabled) {

      renderFeed();
      return;
    }

    // Do not increase an interest above 5/5.

    if (interests[topic] >= 5) {

      renderFeed();
      return;
    }

    // Count different posts within this category.

    countedLikes[topic].add(post.id);

    // Fewer than two likes:
    // Keep the current interest score.

    if (countedLikes[topic].size < LIKE_THRESHOLD) {

      renderFeed();
      return;
    }

    // Two different likes:
    // Silently infer stronger interest.

    interests[topic] = Math.min(
      5,
      interests[topic] + 1
    );

    // Begin counting the next pair of likes.

    countedLikes[topic].clear();

    lastAdjustedTopic = topic;

    // Update the recommendations.

    updateDistribution(topic, 1);

    feedVersion++;

    renderFeed();
    renderInterests();

    // Intentionally NO showFeedback() here.
    // Likes never trigger announcements.
  }


  // ==========================================
  // 14. SHOW MORE / SHOW LESS
  // ==========================================

  function changePreference(topic, amount) {

    if (!learningEnabled) {

      showFeedback(
        "Learning is paused. Your interests were not changed."
      );

      return;
    }

    const oldScore = interests[topic];

    const newScore = Math.max(
      0,
      Math.min(5, oldScore + amount)
    );

    if (newScore === oldScore) {

      showFeedback(
        "This interest is already at its limit."
      );

      return;
    }

    const previous = snapshot();

    interests[topic] = newScore;

    lastAdjustedTopic = topic;

    updateDistribution(topic, amount);

    feedVersion++;

    renderFeed();
    renderInterests();

    showFeedback(
      `${topicIcons[topic]} ${topic}: ${oldScore}/5 → ${newScore}/5. Your feed has been updated.`,
      () => {

        restore(previous);

        showFeedback(
          "↩ Your previous preference and feed were restored."
        );
      }
    );
  }


  // ==========================================
  // 15. MY INTERESTS SETTINGS
  // ==========================================

  function renderInterests() {

    interestsList.replaceChildren();

    Object.keys(interests).forEach(topic => {

      const item = document.createElement("div");
      item.className = "interest-item";

      const header = document.createElement("div");
      header.className = "interest-header";

      const name = document.createElement("span");
      name.className = "interest-name";

      name.textContent =
        `${topicIcons[topic]} ${topic}`;

      const score = document.createElement("span");
      score.className = "interest-score";

      score.textContent =
        `${interests[topic]}/5`;

      header.append(name, score);

      // SLIDER

      const slider = document.createElement("input");

      slider.type = "range";
      slider.min = "0";
      slider.max = "5";
      slider.step = "1";
      slider.value = String(interests[topic]);
      slider.className = "interest-slider";

      slider.setAttribute(
        "aria-label",
        `Interest in ${topic}`
      );

      slider.addEventListener("input", () => {

        const value = Number(slider.value);

        if (value === interests[topic]) {
          return;
        }

        interests[topic] = value;
        lastAdjustedTopic = topic;

        currentDistribution =
          calculateDistribution();

        feedVersion++;

        score.textContent = `${value}/5`;

        renderFeed();
        hideFeedback();
      });

      // REMOVE INTEREST

      const removeButton =
        document.createElement("button");

      removeButton.type = "button";
      removeButton.className = "remove-interest";
      removeButton.textContent = "Remove interest";

      removeButton.addEventListener("click", () => {

        interests[topic] = 0;
        lastAdjustedTopic = topic;

        currentDistribution =
          calculateDistribution();

        feedVersion++;

        slider.value = "0";
        score.textContent = "0/5";

        renderFeed();
        hideFeedback();
      });

      item.append(
        header,
        slider,
        removeButton
      );

      interestsList.appendChild(item);
    });
  }


  // ==========================================
  // 16. PAUSE LEARNING
  // ==========================================

  learningToggle.addEventListener("change", () => {

    learningEnabled =
      learningToggle.checked;

    learningStatus.textContent =
      learningEnabled
        ? "Learning is active."
        : "Learning is paused.";
  });


  // ==========================================
  // 17. RESET RECOMMENDATIONS
  // ==========================================

  resetButton.addEventListener("click", () => {
    resetConfirmation.hidden = false;
  });

  cancelReset.addEventListener("click", () => {
    resetConfirmation.hidden = true;
  });

  confirmReset.addEventListener("click", () => {

    Object.assign(
      interests,
      defaultInterests
    );

    likedPostIds.clear();

    Object.values(countedLikes).forEach(set => {
      set.clear();
    });

    lastAdjustedTopic = "photography";
    feedVersion = 0;

    currentDistribution =
      calculateDistribution();

    resetConfirmation.hidden = true;

    hideFeedback();

    renderFeed();
    renderInterests();

    showFeedback(
      "✅ Your recommendations have been reset."
    );
  });


  // ==========================================
  // 18. INITIALISE MYFEED
  // ==========================================

  renderFeed();
  renderInterests();
  showPage("feed");

});
