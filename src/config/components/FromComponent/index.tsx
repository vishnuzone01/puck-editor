import React from "react";
import {FieldType} from "../../blocks/Form"
import styles from "./styles.module.css";

interface FormDataProps {
    title?: string;
    fieldType?: FieldType;
    options?: { value: string }[] |[];
    description?: string;
}


const FormGroup: React.FC<FormDataProps> = ({ title, fieldType, options, description }) => {

  return (
    <div className={styles.toggleList}>
      <p className={styles.title}>{title}</p>
      {fieldType === "checkbox" && (
        <div className={styles.checkboxGroup}>
                {options?.map((el:any, index: number) => (
        <label key={el.value} className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={index === 1}
            className={styles.checkboxInput}
          />
          <span className={styles.checkboxCustom}></span>
          {el.value}
        </label>
      ))}
         </div>
      )}

      {["textarea", "text", "email", "url", "date"].includes(fieldType || "") &&(
        <>
        <p className={styles.textarea}>{description}</p>
        </>
      )}
      {["select", "multiselect"].includes(fieldType || "") && (
        <div className={styles.dropdown}>
          <select required multiple={fieldType === "multiselect"}>
            <option value="" hidden></option>
            {options?.map((el: any, index: number) => (
              <option key={`${el}_${index}`} value={el.value}>{el.value}</option>
            )
            )}
          </select>
        </div>)}
      {fieldType === "switch" && (
        <label className={styles.switchContainer}>
        <label className={styles.switch}>
          <input
            type="checkbox"
            // checked={isChecked}
            onChange={() => {}}
          />
          <span className={styles.slider}></span>
        </label>
      </label>
      )}
      {fieldType === "radio" && (
        <div className={styles.radioGroup}>
        {options?.map((el: any, index: number) => {
          const value = `option${index + 1}`;
          return (
            <label key={value} className={styles.radioLabel}>
              <input
                type="radio"
                name="customRadio"
                value={value}
                onChange={() => {}}
                className={styles.radioInput}
              />
              <span className={styles.radioCustom}></span>
              {el.value}
            </label>
          );
        })}
      </div>
      )}
      {fieldType === "search" && (
        <div className={styles.searchContainer}>
          <input type="text" id="searchInput" className={styles.searcInput} placeholder="Search items..." />
        </div>
      )}

      {fieldType === "button" && (
        <button className={styles.button}>
        {description}
      </button>
      )}
    </div>
  );
};

export default FormGroup;
