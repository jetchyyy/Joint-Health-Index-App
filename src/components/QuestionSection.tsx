import React from 'react';
import { SectionData, AssessmentAnswers } from '../types/assessment';

interface QuestionSectionProps {
  section: SectionData;
  answers: AssessmentAnswers;
  onAnswerChange: (questionId: string, value: number) => void;
  sectionScore: number;
}

export const QuestionSection: React.FC<QuestionSectionProps> = ({
  section,
  answers,
  onAnswerChange,
  sectionScore
}) => {
  return (
    <div className="shadcn-card" id={`section-${section.key}`}>
      <div className="card-header">
        <div className="card-header-left">
          <span className="section-indicator">{section.key}</span>
          <div>
            <h2 className="card-title">{section.titleEn}</h2>
            <p className="card-description">{section.titleTl}</p>
          </div>
        </div>
        <div className="section-badge-score">
          Part {section.key}: <strong>{sectionScore}</strong> / {section.maxScore}
        </div>
      </div>

      <div className="card-content">
        {/* Scale Legend Table */}
        <div className="scale-legend-box">
          <div className="scale-legend-heading">Rating Scale (Batayan ng Grado):</div>
          <div className="scale-legend-grid">
            {section.scaleOptions.map((opt) => (
              <div key={opt.value} className="scale-legend-item">
                <span className="scale-tag">{opt.value}</span>
                <strong>{opt.labelEn}</strong>
                <small>{opt.labelTl}</small>
              </div>
            ))}
          </div>
        </div>

        {/* Questions Group */}
        <div className="questions-group">
          {section.questions.map((q) => {
            const selectedVal = answers[q.id];

            return (
              <div key={q.id} className="question-item" id={`q-item-${q.id}`}>
                <div className="question-text-row">
                  <span className="question-index">{q.num}.</span>
                  <div>
                    <p className="question-title-en">{q.textEn}</p>
                    <p className="question-title-tl">
                      <em>{q.textTl}</em>
                    </p>
                  </div>
                </div>

                <div className="choice-tiles-grid" role="radiogroup" aria-label={`Question ${q.num}`}>
                  {section.scaleOptions.map((opt) => {
                    const isChecked = selectedVal === opt.value;

                    return (
                      <label key={opt.value} className="choice-tile">
                        <input
                          type="radio"
                          name={q.id}
                          value={opt.value}
                          checked={isChecked}
                          onChange={() => onAnswerChange(q.id, opt.value)}
                        />
                        <span className="choice-score-badge">{opt.value}</span>
                        <span className="choice-label-text">
                          <strong>{opt.labelEn}</strong>
                          <small>{opt.labelTl}</small>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
