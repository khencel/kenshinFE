"use client";

import {
//   FaSearch,
  FaPlus,
  FaUser,
  FaPhone,
  FaCartShopping,
  FaCreditCard,
  FaTrash,
  FaCheck,
  FaPrint,
  FaBottleWater,
  FaDumbbell,
  FaLock,
  FaShirt,
  FaPersonWalking,
} from "react-icons/fa6";

import styles from "./POSPage.module.css";
import { getData } from "@/lib/api/apiEndpoint";
import { Membership } from "../../../../types/membership";
import { useEffect, useState } from "react";
import { Member } from "../../../../types/members";
import { FaSearch } from "react-icons/fa";
import { AddOns } from "../../../../types/addons";
import { Category } from "@/constants/data";

import {
  FaPumpSoap,
  FaPills,
  FaBlender,
  FaUtensils,
  FaLayerGroup,
} from "react-icons/fa6";

export default function POSPage() {
    const [data, setData] = useState<Membership[]>([])

    const [addOns, setAddOns] = useState<AddOns[]>([])
    const [selectedAddOns, setSelectedAddOns] = useState<
      (AddOns & { quantity: number })[]
    >([]);

    const [selectedPlan, setSelectedPlan] = useState<Membership | null>(null);
    const [search, setSearch] = useState("");
    const [members, setMembers] = useState<Member[]>([]);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState("");
    
    const categories = Category();

    const iconMap = {
      FaPumpSoap,
      FaPills,
      FaShirt,
      FaBlender,
      FaUtensils,
      FaLayerGroup,
    };

    const fetchRecord = async () => {

      try {
          const data = await getData<Membership>(
              "memberships/?active=true",
              1,
              150
          );
          const addonsList = await getData<AddOns>(
            "addons/?active=true",
            1,
            150
          );
          setData(data.results);
          setAddOns(addonsList.results)

      } catch (error) {

          console.error(
              "Error fetching records:",
              error
          );

      } finally {

      }
    };

    const updateAddonQuantity = (
      addonId: number,
      change: number
    ) => {
      setSelectedAddOns((prev) =>
        prev
          .map((item) =>
            item.id === addonId
              ? {
                  ...item,
                  quantity: Math.max(1, item.quantity + change),
                }
              : item
          )
      );
    };

    const searchMembers = async (query: string) => {
      setSearch(query);
      setSearchError("");

      if (!query.trim()) {
        setMembers([]);
        setSearchLoading(false);
        return;
      }

      setSearchLoading(true);

      try {
        const response = await getData<Member>("members/", 1, 10, query.trim());
        setMembers(response.results ?? []);
      } catch (error) {
        console.error("Error searching members:", error);
        setMembers([]);
        setSearchError("Failed to search members.");
      } finally {
        setSearchLoading(false);
      }
    };

  useEffect(() => {
      const timeout = setTimeout(() => {
          fetchRecord();
      }, 400);

      return () => clearTimeout(timeout);

  }, []);


  const subtotal =
    Number(selectedPlan?.price ?? 0) +
    selectedAddOns.reduce(
      (sum, addon) =>
        sum + Number(addon.price ?? 0) * addon.quantity,
      0
    );

  const discount = 0;
  const total = subtotal - discount;

  return (
    <div className={styles.page}>

      {/* Header */}
      

      <div className={styles.content}>

        {/* LEFT CONTENT */}
        <main className={styles.main}>
            <div className="row">
                <div className="col">
                    <div className={styles.pageTitle}>
                        <h1>Point of Sale</h1>
                        {/* <p>Membership & Gym Services</p> */}
                    </div>
                </div>
                <div className="col-4 text-end">
                    <div style={{color:"black",fontSize:"14px"}}>
                        <span className="me-2">May 16, 2025</span>
                        <span className="me-2">|</span>
                        <span>10:24 AM</span>   
                    </div>
                </div>
            </div>
          
            
          {/* Member */}

          
          <section className={styles.card}>

            <div className={styles.memberSearchRow}>
              <div className={styles.inputBox}>
                <FaSearch />
                <input
                  type="text"
                  value={search}
                  placeholder="Search member by name or email..."
                  onChange={(e) => {
                    setSelectedMember(null);
                    searchMembers(e.target.value);
                  }}
                />
              </div>

              <button className={styles.newMemberBtn}>
                <FaPlus />
                New Member
              </button>
            </div>


            

            <div className={styles.searchWrapper}>

              {search.trim() !== "" && !selectedMember && (
                <div className={styles.memberSearchResults}>
                  {searchLoading && (
                    <div className={styles.searchState}>
                      <span className={styles.spinner} />
                      Searching members...
                    </div>
                  )}

                  {!searchLoading && searchError && (
                    <div className={`${styles.searchState} ${styles.searchStateError}`}>
                      {searchError}
                    </div>
                  )}

                  {!searchLoading && !searchError && members.length === 0 && (
                    <div className={styles.searchState}>No members found.</div>
                  )}

                  {!searchLoading &&
                    members.map((member) => {
                      const { first_name, last_name, contact_number } =
                        member.personal_info;

                      return (
                        <button
                          key={member.id}
                          type="button"
                          className={styles.memberResult}
                          onClick={() => {
                            setSelectedMember(member);
                            setSearch(`${first_name} ${last_name}`);
                            setMembers([]);
                          }}
                        >
                          <div className={styles.resultAvatar}>
                            {first_name[0]}
                            {last_name[0]}
                          </div>

                          <div className={styles.resultInfo}>
                            <strong>
                              {first_name} {last_name}
                            </strong>
                            <span>{contact_number}</span>
                          </div>

                          <span
                            className={`${styles.resultBadge} ${
                              member.is_active ? styles.badgeActive : styles.badgeInactive
                            }`}
                          >
                            {member.is_active ? "Active" : "Inactive"}
                          </span>
                        </button>
                      );
                    })}
                </div>
              )}

            </div>

            {selectedMember ? (
                <div className={styles.memberInfo}>

                  <div className={styles.avatar}>
                    {selectedMember.personal_info.first_name?.[0]}
                    {selectedMember.personal_info.last_name?.[0]}
                  </div>

                  <div className={styles.memberDetails}>
                    <h3>
                      {selectedMember.personal_info.first_name}{" "}
                      {selectedMember.personal_info.last_name}
                    </h3>

                    <span>
                      Member ID: GYM-{String(selectedMember.id).padStart(5, "0")}
                    </span>

                    <div className={styles.phone}>
                      <FaPhone />
                      {selectedMember.personal_info.contact_number || "No contact number"}
                    </div>
                  </div>

                  <div className={styles.memberStatus}>
                    <span
                      className={
                        selectedMember.is_active ? styles.active : styles.inactive
                      }
                    >
                      {selectedMember.is_active ? "✓ ACTIVE" : "✕ INACTIVE"}
                    </span>

                    {/* Expires / Current Plan: ilagay lang kapag may data na galing sa backend */}
                  </div>

                </div>
              ) : (
                <div className={styles.noMember}>
                  No member selected. Search and select a member above.
                </div>
              )}
          </section>

          {/* Membership Plans */}
          <section className={styles.card}>

            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>
                <FaCreditCard />
              </div>

              <div>
                <h2>Membership Plans</h2>
                <p>Select a plan to add to transaction</p>
              </div>
            </div>

        <div className={styles.plansGrid}>
          {data.map((plan) => {
            const isSelected = selectedPlan?.name === plan.name;

            return (
              <div
                key={plan.name}
                className={`${styles.planCard} ${
                  isSelected ? styles.selected : ""
                }`}
              >
                {isSelected && (
                  <div className={styles.check}>✓</div>
                )}

                <div className={styles.planIcon}>
                  <FaDumbbell />
                </div>

                <h3>{plan.name}</h3>

                <span>
                  {plan.duration} {plan.duration === 1 ? "Day" : "Days"}
                </span>

                <strong>
                  ₱{Number(plan.price).toLocaleString()}
                </strong>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedPlan((prev) =>
                      prev?.id === plan.id ? null : plan
                    )
                  }
                >
                  {isSelected ? "Selected ✓" : "Select"}
                </button>
              </div>
            );
          })}
        </div>

          </section>

          {/* Add-ons */}
          <section className={styles.card}>

            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>
                <FaPlus />
              </div>

              <div>
                <h2>Add-ons</h2>
                <p>Optional items and services</p>
              </div>
            </div>

            <div className={styles.addonsGrid}>

              {addOns.map((addon) => {
                  const selectedAddon = selectedAddOns.find(
                    (item) => item.id === addon.id
                  );

                  const isSelected = Boolean(selectedAddon);

                  return (
                    <div key={addon.id} className={styles.addonCard}>

                      <div className={styles.addonIcon}>
                        {(() => {
                          const category = categories.find(
                            (cat) => cat.id === Number(addon.category)
                          );

                          const Icon = iconMap[
                            category?.icon as keyof typeof iconMap
                          ];

                          return Icon ? <Icon /> : null;
                        })()}
                      </div>
                      <div style={{height:"60px"}}>
                        <h3>{addon.name}</h3>
                      </div>
                      

                      <strong>
                        ₱{Number(addon.price).toLocaleString()}
                      </strong>

                      {isSelected ? (
                        <div className={styles.quantityControl}>
                          <button
                            type="button"
                            onClick={() => {
                              if (selectedAddon?.quantity === 1) {
                                setSelectedAddOns((prev) =>
                                  prev.filter((item) => item.id !== addon.id)
                                );
                              } else {
                                updateAddonQuantity(addon.id, -1);
                              }
                            }}
                          >
                            −
                          </button>

                          <span>{selectedAddon?.quantity}</span>

                          <button
                            type="button"
                            onClick={() => updateAddonQuantity(addon.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedAddOns((prev) => [
                              ...prev,
                              { ...addon, quantity: 1 },
                            ])
                          }
                        >
                          Add
                        </button>
                      )}
                    </div>
                  );
                })}

            </div>

          </section>

        </main>

        {/* RIGHT TRANSACTION */}
        <aside className={styles.transaction}>

          <div className={styles.transactionHeader}>
            <div>
              <FaCartShopping />
              <h2>Transaction</h2>
            </div>

            <span>POS-20250516-001</span>
          </div>

          {/* Customer */}
          <div className={styles.transactionSection}>

            <div className={styles.transactionTitle}>
              <FaUser />
              <h3>Customer</h3>

              <button>
                Change
              </button>
            </div>

            <div className={styles.customer}>
              <div className={styles.customerAvatar}>
                <FaUser />
              </div>

              {selectedMember ? (
                <div>
                  <strong>
                    {selectedMember.personal_info.first_name}{" "}
                    {selectedMember.personal_info.last_name}
                  </strong>
                  <span>
                    Member ID: GYM-{String(selectedMember.id).padStart(5, "0")}
                  </span>
                </div>
              ) : (
                <div>
                  <strong>Walk-in Customer</strong>
                  <span>No member selected</span>
                </div>
              )}
            </div>

          </div>

          {/* Items */}
          <div className={styles.transactionSection}>
            <div className={styles.itemsTitle}>
              <strong>
                {(selectedPlan ? 1 : 0) + selectedAddOns.length} Items
              </strong>
            </div>

            {!selectedPlan && selectedAddOns.length === 0 ? (
              <p>No items added yet.</p>
            ) : (
              <>
                {/* Selected Membership */}
                {selectedPlan && (
                  <div className={styles.item}>
                    <div className={styles.itemIcon}>
                      <FaDumbbell />
                    </div>

                    <div className={styles.itemDetails}>
                      <strong>{selectedPlan.name}</strong>
                      <span>
                        {selectedPlan.duration}{" "}
                        {selectedPlan.duration === 1 ? "Day" : "Days"}
                        {" "}• Gym Access
                      </span>
                    </div>

                    <strong>
                      ₱{Number(selectedPlan.price).toLocaleString()}
                    </strong>

                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() => setSelectedPlan(null)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}

                {/* Selected Add-ons */}
                {selectedAddOns.map((addon) => {
                  const category = categories.find(
                    (cat) => cat.id === Number(addon.category)
                  );

                  const Icon = iconMap[
                    category?.icon as keyof typeof iconMap
                  ];

                  return (
                    <div className={styles.item} key={addon.id}>
                      <div className={styles.itemIcon}>
                        {Icon ? <Icon /> : <FaPlus />}
                      </div>

                      <div className={styles.itemDetails}>
                        <strong>{addon.name}</strong>

                        <span>
                          Qty: {addon.quantity} × ₱
                          {Number(addon.price).toLocaleString()}
                        </span>
                      </div>

                      <strong>
                        ₱
                        {(Number(addon.price) * addon.quantity).toLocaleString()}
                      </strong>

                      <button
                        type="button"
                        className={styles.deleteBtn}
                        onClick={() =>
                          setSelectedAddOns((prev) =>
                            prev.filter((item) => item.id !== addon.id)
                          )
                        }
                      >
                        <FaTrash />
                      </button>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Totals */}
          <div className={styles.totals}>
            <div>
              <span>Subtotal</span>
              <strong>₱{subtotal.toLocaleString()}</strong>
            </div>

            <div>
              <span>Discount</span>
              <strong>₱{discount.toLocaleString()}</strong>
            </div>

            <div className={styles.total}>
              <span>Total</span>
              <strong>₱{total.toLocaleString()}</strong>
            </div>
          </div>

          {/* Payment */}
          <div className={styles.payment}>

            <h3>Payment Method</h3>

            <div className={styles.paymentMethods}>

              <button className={styles.paymentActive}>
                <span>▣</span>
                Cash
              </button>

              <button>
                <b className={styles.gcash}>G</b>
                GCash
              </button>

              <button>
                <b className={styles.maya}>m</b>
                Maya
              </button>

              <button>
                <FaCreditCard />
                Card
              </button>

              <button>
                <FaUser />
                Split
              </button>

            </div>

          </div>

          {/* Amount */}
          <div className={styles.amountRow}>

            <div>
              <label>Amount Tendered</label>

              <div className={styles.amountInput}>
                <span>₱</span>
                <input value="1,420" readOnly />
              </div>
            </div>

            <div>
              <label>Change</label>

              <div className={`${styles.amountInput} ${styles.disabled}`}>
                <span>₱</span>
                <input value="0" readOnly />
              </div>
            </div>

          </div>

          {/* Buttons */}
          <button className={styles.completeBtn}>
            <FaCheck />
            Complete Sale
          </button>

          <button className={styles.printBtn}>
            <FaPrint />
            Print Receipt
          </button>

        </aside>

      </div>
    </div>
  );
}