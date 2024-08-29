;; Define the map to store polls
(define-map polls
  { poll-id: uint }
  {
    creator: principal,
    options: (list 20 { option-name: (string-ascii 20), votes: uint }),
    total-votes: uint
  }
)

;; Function to create a new poll
(define-public (create-poll (poll-id uint) (options (list 20 (string-ascii 20))))
  (if (is-some (map-get? polls { poll-id: poll-id }))
    (err u1) ;; Poll already exists
    (ok (map-insert polls
        { poll-id: poll-id }
        {
          creator: tx-sender,
          options: (map (lambda (option) { option-name: option, votes: u0 }) options),
          total-votes: u0
        }))
  )
)

;; Function to vote on a poll
(define-public (vote (poll-id uint) (option-name (string-ascii 20)))
  (match (map-get? polls { poll-id: poll-id })
    poll (let ((updated-poll (update-poll-vote poll option-name)))
      (match updated-poll
        new-poll (ok (map-set polls { poll-id: poll-id } new-poll))
        (err u3))) ;; Option not found
    (err u2)) ;; Poll not found
)

;; Function to get poll results
(define-read-only (get-results (poll-id uint))
  (match (map-get? polls { poll-id: poll-id })
    poll (ok (get options poll))
    (err u4)) ;; Poll not found
)

;; Helper function to update a poll's vote count
(define-private (update-poll-vote (poll {
    creator: principal,
    options: (list 20 { option-name: (string-ascii 20), votes: uint }),
    total-votes: uint
  }) (option-name (string-ascii 20)))
  (let ((updated-options (map (lambda (option)
                                (if (is-eq (get option-name option) option-name)
                                  (merge option { votes: (+ (get votes option) u1) })
                                  option))
                              (get options poll))))
    (if (is-eq updated-options (get options poll))
      (err u3) ;; Option not found
      (ok {
        creator: (get creator poll),
        options: updated-options,
        total-votes: (+ (get total-votes poll) u1)
      }))
  )
)