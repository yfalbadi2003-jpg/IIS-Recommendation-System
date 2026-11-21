# MyFeed Development Record

## Stage 1 — Initial Prototype

**Objective:** Establish the basic structure of a social media feed.

**Implementation:** Developed the interface using HTML, CSS and JavaScript, with content organised into four categories: photography, cooking, fitness and travel.

**Design rationale:** The initial interface provided a foundation for implementing recommendation behaviour and interactive preference controls.

**Verification:** The final prototype contains the HTML, CSS and JavaScript components described above. The original development stage was not separately preserved.

## Stage 2 — Rule-Based Recommendation System

**Objective:** Introduce personalised recommendations based on user interests.

**Implementation:** Used JavaScript to represent user preferences as interest scores across four categories: photography, cooking, fitness and travel. Recommendation logic uses these scores to select content for the feed.

**Design decision:** A rule-based approach was selected instead of a trained machine-learning model to keep the prototype manageable and focus on transparency and user control. A decision was made to prioritise posts from categories with higher interest scores while retaining posts from lower-interest categories to maintain content diversity.

**Intelligent behaviour:** The system uses preference scores to determine which posts to recommend, simulating personalisation without a trained AI model.

**Verification:** Tested the recommendation system by increasing the Photography interest score to its maximum and reducing the other categories to their minimum. Photography posts became more prominent, confirming that interest scores influence feed recommendations. This test was conducted retrospectively during development documentation.

## Stage 3 — Recommendation Explanations

**Objective:** Help users understand why content appears in their personalised feed.

**Implementation:** Added a "Why this?" feature that provides simplified explanations for recommended posts.

**Design decision:** Simplified explanations were chosen instead of displaying detailed recommendation logic to support mental models while limiting unnecessary cognitive load.

**IIS concepts:** Transparency, mental models, bounded rationality and extraneous cognitive load.

**Verification:** Tested the "Why this?" feature by selecting it on a recommended post. A relevant explanation appeared, confirming that the feature communicates why the content was recommended.

## Stage 4 — User Preference Controls

**Objective:** Allow users to correct inaccurate preferences and directly influence recommendations.

**Implementation:** Added "Show more" and "Show less" controls that adjust category interest scores, alongside interest sliders in Settings.

**Design decision:** Explicit preference controls were provided alongside automatic inference to support user agency and allow users to correct potentially inaccurate system assumptions.

**IIS concepts:** Designing for uncertainty, user agency and Shneiderman's two dimensions of Human-Centered AI.

**Verification:** Successfully tested "Show more", "Show less" and the interest sliders. Adjustments updated category interest scores and influenced subsequent recommendations.

## Stage 5 — Undo and Feedback

**Objective:** Support error recovery and communicate the consequences of user actions.

**Implementation:** Added a five-second Undo option for "Show more" and "Show less", alongside feedback messages communicating the consequences of user interactions. The Undo notification duration was reduced to five seconds to provide immediate error recovery without unnecessarily cluttering the interface. This balances reversibility with reduced visual distraction and cognitive load.

**Design decision:** Undo allows users to reverse unintended changes without manually restoring scores. Feedback messages were kept brief to communicate the consequences of user actions without unnecessary interruptions.

**IIS concepts:** Reversibility, slips and mistakes, visibility and the gulf of evaluation.

**Verification:** Testing confirmed that the Undo button reverses preference changes and remains available for five seconds. Feedback messages were also displayed following relevant user interactions.

## Stage 6 — Implicit Preference Inference

**Objective:** Demonstrate how a recommendation system can learn from user interactions.

**Implementation:** Added preference inference based on two likes on different posts within the same category, increasing that category's interest score. Feedback messages also communicate like interactions.

**Design decision:** Requiring two interactions reduces reliance on a single like, supporting cautious adaptation. However, repeated likes may still be an inaccurate indication of users' preferences.

**IIS concepts:** System inference, cautious adaptation and uncertainty in implicit feedback.

**Verification:** Testing confirmed that two likes on different posts within the same category increase its interest score.

## Stage 7 — Global Controls and Final Refinements

**Objective:** Improve transparency and give users greater control over personalisation.

**Implementation:** Added an About page explaining system capabilities and limitations, controls for pausing automatic learning and resetting recommendations, and a fixed library of 24 posts.

**Design decision:** Global controls allow users to manage automatic adaptation and reset preferences. The About page communicates system capabilities separately from the main feed to limit interface complexity.

**IIS concepts:** Horvitz's G1 and G2, global controls, mental models, and inspectable, editable and forgettable memory.

**Verification:** Testing confirmed that two likes do not increase interest scores when automatic learning is paused and that the About page displays information about the system's capabilities and limitations. Additionally, resetting recommendations returns interest scores to their initial settings.

## Development Evidence

The GitHub repository contains the final implementation. Earlier development stages were not preserved as separate commits. This record reconstructs the development process using the final implementation and retrospective functional checks.

Completed checks and their results are documented above.

