# MyFeed — Transparent and Controllable Social Media Recommendations

## Project Overview

MyFeed is an interactive prototype of a social media recommendation system designed to make personalised recommendations more understandable and controllable.

The prototype uses a rule-based recommendation system implemented in JavaScript rather than a trained machine-learning model. It demonstrates how users can understand, modify and reverse the preferences influencing their feed.

## Implemented Features

- **Personalised feed:** Displays recommendations using category interest scores across photography, cooking, fitness and travel.
- **Why this?:** Provides simplified explanations of why posts are recommended.
- **Show more / Show less:** Allows users to adjust their interest in a category.
- **Implicit preference inference:** Two likes on different posts within the same category increase its interest score.
- **Interest settings:** Allows users to directly adjust or remove category preferences.
- **Undo:** Allows users to reverse recent preference changes.
- **Pause learning:** Prevents automatic preference updates from likes without disabling explicit preference controls.
- **Reset recommendations:** Restores the initial interest scores.
- **About page:** Explains the system's capabilities and limitations.

## Technical Implementation

MyFeed uses HTML for its structure, CSS for its interface and JavaScript for recommendation logic and interactions.

The prototype contains 24 predefined posts across four categories. Category scores range from 0 to 5, and the feed prioritises higher-scoring categories while retaining content from other categories to support diversity.

The system simulates personalised recommendations. It does not use a trained machine-learning model, track viewing duration or retain preferences between sessions.

## Development Evidence

The [Development Log](DEVELOPMENT_LOG.md) documents the project's development stages, design decisions and verification checks.

## AI Use and Authorship

ChatGPT was used to support my understanding of interaction design concepts, discuss implementation approaches and suggest JavaScript modifications. I reviewed AI suggestions against the project's objectives and made decisions about which changes to incorporate.

The following examples demonstrate my review and adaptation of AI-assisted suggestions:

### 1. System Inference

I questioned whether explicit preference controls demonstrated meaningful system inference, as users were directly instructing the system to change their interests. This prompted further consideration of the distinction between explicit instructions and inferred preferences.

[Evidence: Discussion of system inference](evidence/01-system-inference.png)

### 2. Undo Refinement

I identified that the Undo notification remained visible for too long. ChatGPT suggested shortening its duration and modifying the JavaScript feedback function. I adopted a five-second duration to preserve error recovery while reducing unnecessary interface clutter.

[Evidence: Undo refinement discussion](evidence/02-undo-refinement.png)

### 3. Recommendation Explanations and Feedback

I identified that the initial "Why this?" explanations were too complex and that Show more / Show less did not provide sufficiently visible feedback. I requested simpler explanations and clearer feedback to reduce unnecessary cognitive load and make the consequences of user actions more apparent.

[Evidence: Explanation and feedback discussion](evidence/03-explanations-feedback.png)

## Scope and Limitations

MyFeed is a functional prototype demonstrating transparent and controllable recommendation interactions. Its recommendation behaviour is simulated using predefined content and category scores. It does not include a trained recommendation model, persistent user profiles or formal user evaluation.
